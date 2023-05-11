'use strict';
/*
- The game has 2 playing in rounds
-In each turn, a player rols a dice as many times as he whishs.Each result get added to his round score
-But , iof the player rolls a , all his Round score gets lost. After that, it's the next player's turn
-The player can cchoose to 'Hold', wich means that his Round score gets added to his GLOBAL score. After that, it's  the next player's turn
-The first person to reach 100 ponts n GLOBAL scoare wins the game
========Part 2

-if two sixes in a row where rolled player losses entire score.After that the next players turn
-add input where player can set the winning score
-add two dices. and the player losses entire score when he hit a 1
*/

var lastDice, scores, roundScores, activePlayer, gamePlaying;

init();

document.querySelector('.btn--roll').addEventListener('click',function (){
 if (gamePlaying) {
    //Random number betwen 1-6
    var dice1 = Math.floor ( Math.random() * 6 ) + 1;
    var dice2 = Math.floor ( Math.random() * 6 ) + 1;
    console.log(`The dices rolled shows the values: ${dice1} and  ${dice2}`);
   
    
    var dice1DOM = document.getElementById('dice-1');
    var dice2DOM = document.getElementById('dice-2');

    //Display result
    dice1DOM.style.display = 'block';
    dice1DOM.src = 'dice-' + dice1 + '.png'; 
    dice2DOM.style.display = 'block';
    dice2DOM.src = 'dice-' + dice2 + '.png'; 
    if (dice2 !== 1 && dice1 !== 1){
        //Add Score
        roundScores +=dice1+dice2;
        document.querySelector('#current--'+ activePlayer).textContent=roundScores;
    }
    else {
        //Next player
        moveToNextPlayer();
    }

/*
    //Chalange 3
    //Update the round score if thereload number was not a 1
    if (dice === 6 && lastDice === 6){
        //Player looses score
        scores[activePlayer]=0;
       //Update UI
       document.querySelector('#score--'+ activePlayer).textContent =  '0';
        moveToNextPlayer();

    }else  if (dice !== 1){
        //Add Score
        roundScores +=dice;
        document.querySelector('#current--'+ activePlayer).textContent=roundScores;
    }
    else {
        //Next player
        moveToNextPlayer();
    }
    lastDice=dice;
}
*/
 }
});


document.querySelector('.btn--hold').addEventListener('click', function (){
    var winningScore;
    if (gamePlaying) {
      // Add current score to global Score
      scores[activePlayer] += roundScores;
    
    
      //Update UI
      document.querySelector('#score--'+ activePlayer).textContent =  scores[activePlayer];
      var getFinalScoreVariable=document.querySelector('.final-score').value;
      console.log(`Final score set is ${getFinalScoreVariable}.`);
        //undefined 0, null or "" are Coereced to false
        if (getFinalScoreVariable){
            //anything else is Coerced to true
            let input = document.querySelector('.final-score').value;
            winningScore = input; 
        }else{
            winningScore = 100;
        }
      //Check if player won the game
      if (scores[activePlayer] >= winningScore) {
          console.log(`Player ${activePlayer} has won the game`);
          document.querySelector('#name--'+activePlayer).textContent = 'Winner!';
          document.getElementById('dice-1').style.display = 'none';
          document.getElementById('dice-2').style.display = 'none';
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
/*
    document.getElementById('dice-1').style.display ='none';
    document.getElementById('dice-2').style.display ='none';
    */
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


    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    
}
/*
window.addEventListener('load', function(){
    var person1 = prompt("Please enter your name", "Player 1");
    var person2 = prompt("Please enter your name", "Player 2");
    document.getElementById('name--0').textContent = person1;
    document.getElementById('name--1').textContent = person2;
});
*/

function playerNameSetter(id, defaultName){
    if(id && defaultName){
        document.getElementById(id).addEventListener('click',function (){
            let personName = prompt("Specify player one name:", defaultName);
            let player1 = document.getElementById(id);
            player1.textContent = personName ? personName : defaultName; 
        });
    } 
    else{
        console.log('The ID or the DEFAULT_NAME you enter is not corectly defined. ID value is ${id} and DEFAULT_NAME value is ${defaultName}');
    }

}


