'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //just to show the difference between querySelector and getElementById
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
//In order to scope the variales we declare them utside the function
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // 0-player1; 1-player2
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};
//we invoke the function here
init();
// it doesnt need a parameter or argumet because it doesnt change and doesnt return anything, is just an reusable code

//Switch player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  // if (playing === true) theres no need for checking
  if (playing) {
    //Rolling dice functionality
    //1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display the dice
    //  2.1 first remove the hidden class so the dice is visible when the game starts
    diceEl.classList.remove('hidden');
    //  2.2 each number should apear with the images of the dice from 1 to 6
    diceEl.src = `dice-${dice}.png`;
    //3. Check for a rolled 1: if true, switch to next player
    if (dice !== 1) {
      //Add the dice to current score
      currentScore += dice;
      // current0El.textContent = currentScore; this one select only the player 1
      //in the exmp below we can select dinamicaly the current active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player when the dice hits 1

      //--- all this code is swaped by the function switchPlayer()
      //if activPlayer is 0; = 1; dif 1 than = 0;
      //before we change the player, we should set the currentscore to 0 for the current-player
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // currentScore = 0;
      //than we switch to ne next player
      // activePlayer = activePlayer === 0 ? 1 : 0;
      //togle method will ensure that if the class is in the element will remove it and if it is not will add it
      //in the html we add the class player--active to only one of the player so when we write the code like this we will make sure that the class will change from one to the other after every dice=1
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //it will be active only when playing is true
  if (playing) {
    //1. add current score to the score of active player
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if score is >= 100
    if (scores[activePlayer] >= 100) {
      //2.1 finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //2.2 Switch to the next player
      switchPlayer();
    }
  }
});
//when we hit new game we reset all with function init
btnNew.addEventListener('click', init);
