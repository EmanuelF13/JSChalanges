'use strict';
/*
- The game has 2 playing in rounds
-In each turn, a player rols a dice as many times as he whishs.Each result get added to his round score
-But , iof the player rolls a , all his Round score gets lost. After that, it's the next player's turn
-The player can cchoose to 'Hold', wich means that his Round score gets added to his GLOBAL score. After that, it's  the next player's turn
-The first person to reach 100 ponts n GLOBAL scoare wins the game

*/

var scores, roundScores, activePlayer, gamePlaying;

init();




document.querySelector('.btn--roll').addEventListener('click',function (){
 if (gamePlaying) {
    //Random number betwen 1-6
    var dice = Math.floor ( Math.random() * 6 ) + 1;
    console.log(`The dice rolled shows the value ${dice}`);
   
    
    var diceDOM = document.querySelector('.dice');

    //Diplay result
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png'; 

    //Update the round score if thereload number was not a 1
    if (dice > 1){
        //Add Score
        roundScores +=dice;
        document.querySelector('#current--'+ activePlayer).textContent=roundScores;
    }
    else {
        //Next player
        moveToNextPlayer();
    }
}


});


document.querySelector('.btn--hold').addEventListener('click', function (){
    if (gamePlaying) {
      // Add current score to global Score
      scores[activePlayer] += roundScores;
    
    
      //Update UI
      document.querySelector('#score--'+ activePlayer).textContent =  scores[activePlayer];
  
      //Check if player won the game
      if (scores[activePlayer] >= 10) {
          console.log(`Player ${activePlayer} has won the game`);
          document.querySelector('#name--'+activePlayer).textContent = 'Winner!';
          document.querySelector('.dice').style.display = 'none';
          document.querySelector('.player--'+activePlayer).classList.add('player--winner');
          document.querySelector('.player--'+activePlayer).classList.remove('player--active');
          gamePlaying=false;
      }
      else {
      //Next Player
           moveToNextPlayer();
      }
    }  
});



function moveToNextPlayer(){
    roundScores =0;
    document.querySelector('#current--'+ activePlayer).textContent=roundScores;
    activePlayer === 0 ? activePlayer =1 : activePlayer =0;       
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
    //await(800);
    //document.querySelector('.dice').style.display ='none';

}

document.querySelector('.btn--new').addEventListener('click', init);

function init(){
    gamePlaying =true;
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.getElementById('name--1').textContent = 'Player 2';
    document.getElementById('name--0').textContent = 'Player 1';
    scores= [0,0];
    activePlayer=0;
    roundScores=0;

    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');


    document.querySelector('.dice').style.display= 'none';
    
}


