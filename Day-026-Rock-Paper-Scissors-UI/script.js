const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const playerChoiceEl = document.getElementById('player-choice');
const computerChoiceEl = document.getElementById('computer-choice');
const resultTextEl = document.getElementById('result-text');
const buttons = document.querySelectorAll('.btn');
const resetBtn = document.getElementById('reset');

let playerScore = 0;
let computerScore = 0;

const choices = ['rock', 'paper', 'scissors'];
const emojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

const winConditions = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
};

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const playerChoice = btn.dataset.choice;
        const computerChoice = choices[Math.floor(Math.random() * 3)];

        playerChoiceEl.textContent = emojis[playerChoice];
        computerChoiceEl.textContent = emojis[computerChoice];

        if (playerChoice === computerChoice) {
            resultTextEl.textContent = "It's a Draw!";
            resultTextEl.className = 'draw';
        } else if (winConditions[playerChoice] === computerChoice) {
            resultTextEl.textContent = "You Win!";
            resultTextEl.className = 'win';
            playerScore++;
            playerScoreEl.textContent = playerScore;
        } else {
            resultTextEl.textContent = "You Lose!";
            resultTextEl.className = 'lose';
            computerScore++;
            computerScoreEl.textContent = computerScore;
        }
    });
});

resetBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    playerChoiceEl.textContent = '❔';
    computerChoiceEl.textContent = '❔';
    resultTextEl.textContent = 'Choose your move!';
    resultTextEl.className = '';
});