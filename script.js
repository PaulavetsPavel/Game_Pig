'use strict';
// element selections
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

let isPlaying, totalScores, currentScore, activePlayer;

// Functions
const initGame = function () {
  isPlaying = true;
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceElement.classList.add('hidden');

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.remove('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.add('player--active');
};

const getRandomNumber = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

const displayCurrentScorePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

const displayTotalScorePlayer = function () {
  document.getElementById(`score--${activePlayer}`).textContent =
    totalScores[activePlayer];
};

const switchActivePlayer = function () {
  currentScore = 0;
  displayCurrentScorePlayer();
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Start game
initGame();

// Roll dice
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // Generate random number
    const diceNumber = getRandomNumber();

    // Display number on the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice${diceNumber}.png`;

    // If the number is 1, swich to the next player, if not - add number to th current score
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      displayCurrentScorePlayer();
    } else {
      switchActivePlayer();
    }
  }
});

// Hold score
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    totalScores[activePlayer] += currentScore;
    displayTotalScorePlayer();
    currentScore = 0;
    displayCurrentScorePlayer();
    if (totalScores[activePlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      switchActivePlayer();
    }
  }
});

// New game
btnNew.addEventListener('click', initGame);
