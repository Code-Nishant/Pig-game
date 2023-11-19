'use strict';

//selecting element
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//chossing element by queryselector...
const scoreZero = document.querySelector('#score--0');
const scoreOne = document.getElementById('score--1');
const currentZero = document.getElementById('current--0');
const currentOne = document.getElementById('current--1');

const dice = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

let score;
let currentscore;
let activePlayer;
let playing;

//intial condition
const init = function () {
  scoreOne.textContent = 0;
  scoreZero.textContent = 0;
  currentOne.textContent = 0;
  currentZero.textContent = 0;
  dice.classList.add('hidden');

  score = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  playing = true;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

//swap player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentscore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//rolling of dice
roll.addEventListener('click', function () {
  if (playing) {
    //generating random no. for dice(bet 1-6)
    const actualDice = Math.trunc(Math.random() * 6) + 1;

    //displaying dice no when roll dice...
    dice.classList.remove('hidden');
    dice.src = `dice-${actualDice}.png`;

    //check for 1
    if (actualDice !== 1) {
      currentscore = currentscore + actualDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
    }
    //switch the player
    else {
      switchPlayer();
    }
  }
});

//holding score of active player
hold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] = score[activePlayer] + currentscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //if player wins
    if (score[activePlayer] >= 20) {
      //condition for stoping the game...
      playing = false;
      dice.classList.add('hidden');
      //displaying for winner player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('activePlayer');
    } else {
      switchPlayer();
    }
  }
});

//new game
newGame.addEventListener('click', function () {
  init();
});
