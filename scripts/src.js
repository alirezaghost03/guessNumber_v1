"use strict";

// -------------------------------
//          Game States
// -------------------------------
let gameStates = ["start", "playing", "win", "defeat"];
let guessStates = ["lower", "higher"];

let gameState;    // current game state
let guessState;   // current hint state (higher/lower)
let GoalNumber;   // the number to guess
let gameLevel;    // selected game level

// -------------------------------
//          DOM Elements
// -------------------------------
const restartGameBtn = document.querySelector(`#tryAgainBtn`);
let textGuess = document.querySelector(`#Guesee`);
let textResult = document.querySelector(`#result`);
let Body = document.querySelector(`body`);
let guessesRemain = document.querySelector(`#guessesRemain`);

// -------------------------------
//          Game Levels
// -------------------------------
let gameLevels = [
    { name: `easy`, time: 60, maxChances: 10 },
    { name: `medium`, time: 45, maxChances: 8 },
    { name: `hard`, time: 30, maxChances: 7 }
];

// -------------------------------
//          Valid Options
// -------------------------------
let possibleOptions = {
    gameState: gameStates,
    guessState: guessStates
};

// -------------------------------
//          Utility Functions
// -------------------------------

// check if variable exists
let isStateExist = function(variable) { 
    return Boolean(variable);
};

// check if a state is valid
let isValidState = function(variable, state) {
    return possibleOptions[variable].includes(state);
};

// change state if valid
let changeTheState = function(variable, state) {
    if (isValidState(variable, state)) {
        variable = state;
        console.log("State changed...");
    } else {
        console.log("The state is invalid");
    }
};

// generate random number
function getRandomNumber() {
    return Math.trunc(Math.random() * 100) + 1;
}

// set goal number
const getTheGoalNumber = function() {
    GoalNumber = getRandomNumber();
};

// -------------------------------
//          Player Object
// -------------------------------
let player = {
    guess: 0,       // last guess
    chances: 0,     // remaining chances
    maxChances: 0   // maximum chances
};

// -------------------------------
//          Start Game
// -------------------------------
const startGame = function() {
    gameState = "start";
    refresh();
};

// restart button event
restartGameBtn.addEventListener(`click`, () => {
    gameState = `start`;
    refresh();
});

// -------------------------------
//          Guess Logic
// -------------------------------
const guessTheNumber = function() {
    if (gameState === `playing`) {
        player.chances--;
        player.guess = Number(textGuess.value);

        if (player.guess === GoalNumber) {
            gameState = `win`;
        } else if (player.chances <= 0) {
            gameState = `defeat`;
        } else {
            hint(player.guess, GoalNumber);
        }

        refresh();
    }
};

// -------------------------------
//          Refresh Game
// -------------------------------
const refresh = function() {
    console.log(gameState);

    switch (gameState) {
        case `start`:
            // ask level and initialize player
            askTheGameLevel();
            getTheGoalNumber();
            player.maxChances = gameLevels.find(x => x.name === gameLevel).maxChances;
            player.chances = player.maxChances;

            // set game to playing
            gameState = `playing`;
            break;

        case `playing`:
            console.log(GoalNumber);
            break;

        case `win`:
            break;

        case `defeat`:
            console.log(gameState);
            break;
    }

    // update UI
    guessesRemain.innerHTML = player.chances;
    refreshUi();
};

// -------------------------------
//          Hint Logic
// -------------------------------
const hint = function(guess, goal) {
    if (guess > goal) {
        guessState = `higher`;
    } else if (goal > guess) {
        guessState = `lower`;
    }
};

// -------------------------------
//          Refresh UI
// -------------------------------
// 
const refreshUi = function() {
    // پاک کردن کلاس‌های قبلی مربوط به state
    Body.classList.remove('start', 'playing', 'win', 'defeat');

    // اضافه کردن کلاس مربوط به state فعلی
    Body.classList.add(gameState);

    switch (gameState) {
        case `start`:
            textResult.innerHTML = `Start the game!`;
            break;

        case `playing`:
            if (guessState === `lower`) {
                textResult.innerHTML = `The goal is higher`;
            } else if (guessState === `higher`) {
                textResult.innerHTML = `The goal is lower`;
            }
            console.log(GoalNumber);
            break;

        case `win`:
            textResult.innerHTML = `You win!`;
            break;

        case `defeat`:
            textResult.innerHTML = `Oops! You're out of chances.`;
            textResult.style.fontSize = '72px';
            break;
    }

    guessesRemain.innerHTML = player.chances;
};


// -------------------------------
//          Ask Game Level
// -------------------------------
const askTheGameLevel = function() {
    console.log(`_______________TODO: implement input level`);
    gameLevel = `easy`; // default level
    return `easy`;
};

// -------------------------------
//          Initialize Game
// -------------------------------
startGame();
