



//Images paths aray for the card game 
var availableImages = [
    'DogsPics/HERDING_Australian-Shepherd.jpg',
    'DogsPics/HERDING_Beauceron.jpg',
    'DogsPics/HERDING_Belgian-Malinois.jpg',
    'DogsPics/HERDING_Border-Collie.jpg',
    'DogsPics/HERDING_Collie-(Rough).jpg',
    'DogsPics/HERDING_German-Shepherd-Dog.jpg',
    'DogsPics/HOUND_American-Foxhound.jpg',
    'DogsPics/HOUND_Beagle-(13inch).jpg',
    'DogsPics/HOUND_Whippet.jpg',
    'DogsPics/NonSporting_Bichon-Frise.jpg',
    'DogsPics/NonSporting_Chow-Chow.jpg',
    'DogsPics/NonSporting_Dalmatian.jpg',
    'DogsPics/NonSporting_French-Bulldog.jpg',
    'DogsPics/NonSporting_ShibaInu_2588.jpg',
    'DogsPics/SPORTING_Golden-Retriever.jpg',
    'DogsPics/SPORTING_Labrador-Retriever.jpg',
    'DogsPics/SPORTING_Wirehaired-Pointing-Griffon.jpg',
    'DogsPics/TERRIER_Airedale-Terrier.jpg',
    'DogsPics/TERRIER_Bull-Terrier-(Colored).jpg',
    'DogsPics/TERRIER_Staffordshire-BullTerrier.jpg',
    'DogsPics/TERRIER_Wire-Fox-Terriers.jpg',
    'DogsPics/TOY_Pomeranian.jpg',
    'DogsPics/TOY_Pug.jpg',
    'DogsPics/TOY_Shih-Tzu.jpg',
    'DogsPics/TOY_Silky-Terrier.jpg',
    'DogsPics/TOY_Yorkshire-Terrier.jpg',
    'DogsPics/WORKING_Akita.jpg',
    'DogsPics/WORKING_Alaskan-Malamute.jpg',
    'DogsPics/WORKING_Bernese-Mountain-Dog.jpg',
    'DogsPics/WORKING_Rottweiler.jpg'


];



$(document).ready(function () {


    $('#Time').hide();
    $('#restart').hide();

    $('#startbutton').click(function () { //Handler for the game start button
        var playerName = $('#InputName').val();
        var selectedPairs = parseInt($('.form-select').val());


        $("#Time").show();//Showing the time running in the background



        $('#player-name').text("player: " + playerName);





        /*Game Mechanism*/
        var gameBoard = $('#game-board');
        var flippedCards = [];//array for the pair of cards that were flipped for check
        var matchedPairs = 0;//total number of matching pairs
        var canFlip = true;//boolean variable for checking if another cards can be flipped at the time



        function CreateCard(frontPath) { //The function creates a card for the game using an image path from the cards images array
            var card = $('<div class="card">');
            var front = $('<img class="front" src="' + frontPath + '">');
            var back = $('<img class="back" src="BackCard.jpg">');
            var cardInner = $('<div class="card-inner flipped">');

            cardInner.append(front, back);
            card.append(cardInner);

            card.click(function () {
                if (!canFlip || $(this).hasClass('flipped')) {
                    return;
                }

                $(this).addClass('flipped');
                flippedCards.push($(this));

                if (flippedCards.length === 2) { // 2 cards were flipped, checking match
                    canFlip = false;
                    setTimeout(function () {
                        var frontImages = flippedCards.map(function (card) {
                            return card.find('.front').attr('src');
                        });

                        if (frontImages[0] === frontImages[1]) {
                            flippedCards[0].removeClass('flipped');
                            flippedCards[1].removeClass('flipped').addClass('matched');
                            flippedCards[0].addClass('matched');
                            matchedPairs++;

                            if (matchedPairs === selectedPairs) {
                                //The player matched all the pairs
                                endGame();
                            }
                        } else {
                            flippedCards[0].removeClass('flipped');
                            flippedCards[1].removeClass('flipped');
                            //flipping back the cards
                        }

                        flippedCards = [];
                        canFlip = true;
                    }, 1000);
                }
            });

            return card;
        }



        //Shuffling random images from the images array
        var shuffledImages = availableImages.slice(0, selectedPairs).concat(availableImages.slice(0, selectedPairs));
        shuffledImages.sort(function () {
            return 0.5 - Math.random(); //Randomize the cards order 
        });

        for (var i = 0; i < shuffledImages.length; i++) {
            var card = CreateCard(shuffledImages[i]);
            gameBoard.append(card);
        }




        function endGame() {//Function for handling the end of the game 
            $('#restart').show();
            stopStopwatch();

        }





        /*******************/


        $('#restart').click(function () {
            location.reload(); // Refresh the page
        });


        //Hiding the unrelevent elements from before the game 
        $('form').hide();
        $('#startbutton').hide();
        $('.alert').hide();








        var hours = 0;
        var minutes = 0;
        var seconds = 0;

        function updateStopwatch() { //The function makes the time text run as in stopwatch
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }

            var timeString =
                (hours < 10 ? "0" + hours : hours) +
                ":" +
                (minutes < 10 ? "0" + minutes : minutes) +
                ":" +
                (seconds < 10 ? "0" + seconds : seconds);

            $("#Time").text("Time: " + timeString);
        }

        var stopwatchInterval = setInterval(updateStopwatch, 1000);

        function stopStopwatch() { //The function stops the stopwatch at the current time
            clearInterval(stopwatchInterval);
        }





    });




});


