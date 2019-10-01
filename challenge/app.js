/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
alert("WELCOME TO THE DICE GAME PLEASE FILL THE INPUR FIRST \n SO THAT THIS WILL BE THE FINAL SCORE THAT YOU CAN REACH \n IF YOU LEAVE THE INPUT EMPTY THE WINNING SCORE WILL BE 100");

var score , roundScore ,activePlayer, gamePlaying;
    init();

var previousDice;
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying){
        // generate random number
        var dice1 = Math.floor(Math.random() * 6 ) + 1; // get an integer random number from 0 to 6  
        var dice2 = Math.floor(Math.random() * 6 ) + 1; // get an integer random number from 0 to 6  

        // save the previous value of the rolling dice 

        // 1. display the result 
        var diceDOM = document.getElementById('dice-1');
        var diceDOM2 = document.getElementById('dice-2');
        // 2. display the dice number and photo
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice1 + ".png";
        diceDOM2.style.display = "block";
        diceDOM2.src = "dice-" + dice2 + ".png";


        // 3. update the round score IF the rolled number was NOT a 1 
        if ( dice1 === 6 && previousDice === 6 ) {
            // make the palyer score zero he will lose his score
            score[activePlayer] = 0;
            document.querySelector('#score-'+activePlayer).textContent =  score[activePlayer];
             // swipe to the next player
            alert("OoPs ! you rolled twice 6 in a row so that you lost all your points :(");

            nextPlayer();
        }
        else if (dice1 !== 1 || dice2 !== 1 ){
                // Add score
                roundScore += dice1 + dice2;
                document.querySelector('#current-'+activePlayer).textContent = roundScore;
        } else {
            alert("OoPs ! you rolled a 1 so that it will swipe to the next player");
            // swipe to the next player
            nextPlayer();
        }
        previousDice = dice1;
    } else {
        alert("This Game Finished. Please Start a new game !!!");
    }

});
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying){
        score[activePlayer] += roundScore;
        // update the score UI 
        document.querySelector('#score-'+activePlayer).textContent =  score[activePlayer];
        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // How Won
        if (score[activePlayer] >= winningScore) {
            // console.log("palyer number "+ activePlayer + "is won");
            document.querySelector('#name-'+ activePlayer).textContent = "winner !";
            document.getElementById('dice-1').style.display = "none";
            document.getElementById('dice-2').style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            // swipe to the next player 
            nextPlayer();
        }
    } else {
        alert("This Game Finished. Please Start a New Game !!!");
    }
});

document.querySelector('.btn-new').addEventListener('click', init);



// this function swipe the player
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('#current-'+activePlayer).textContent = roundScore;

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.getElementById('dice-1').style.display = "none";
    document.getElementById('dice-2').style.display = "none";

}


// start a new game function 
function init () {
    score = [0 ,0]; // final score for the players
    roundScore = 0; // this will be the rounded score 
    activePlayer = 0; // this to make swipe between the two player and make one of them active 0 or 1 
    // 0 will be for the first player and 1 will be for the secend player.   
    gamePlaying = true; // this for stop the game when some one win 
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";

    // document.querySelector('#current-'+activePlayer).textContent = dice;
    document.getElementById('dice-1').style.display = "none";
    document.getElementById('dice-2').style.display = "none";

    document.getElementById('name-0').textContent = "player 1";
    document.getElementById('name-1').textContent = "player 2";
    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0"

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");


}