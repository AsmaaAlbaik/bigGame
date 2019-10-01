/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score , roundScore ,activePlayer, gamePlaying;
    init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying){
        // generate random number
        var dice = Math.floor(Math.random() * 6 ) + 1; // get an integer random number from 0 to 6  
        // 1. display the result 
        var diceDOM = document.querySelector('.dice');
        // 2. display the dice number and photo
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";

        // 3. update the round score IF the rolled number was NOT a 1 
        if (dice !== 1 ){
            // Add score
            roundScore += dice;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        } else {
            // swipe to the next player
            nextPlayer();
        }
    }

});
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying){
        score[activePlayer] += roundScore;
        // update the score UI 
        document.querySelector('#score-'+activePlayer).textContent =  score[activePlayer];
        // How Won
        if (score[activePlayer] >= 10) {
            // console.log("palyer number "+ activePlayer + "is won");
            document.querySelector('#name-'+ activePlayer).textContent = "winner !";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            // swipe to the next player 
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('#current-'+activePlayer).textContent = roundScore;

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".dice").style.display = "none";

}

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
    document.querySelector(".dice").style.display = "none";

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