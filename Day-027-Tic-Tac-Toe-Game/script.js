const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status-text');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const scoreDraw = document.getElementById('score-draw');
const resetBtn = document.getElementById('reset');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let scores = { X: 0, O: 0, Draw: 0 };

const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (board[index]!== "" ||!isGameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());

    checkResult();
}

function checkResult() {
    let roundWon = false;
    let winningLine = [];

    for (let condition of winConditions) {
        let [a,b,c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winningLine = condition;
            break;
        }
    }

    if (roundWon) {
        statusText.innerHTML = `Player <span>${currentPlayer}</span> Won! 🎉`;
        winningLine.forEach(i => cells[i].classList.add('win'));
        scores[currentPlayer]++;
        updateScore();
        isGameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw! 🤝";
        scores.Draw++;
        updateScore();
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X"? "O" : "X";
    statusText.innerHTML = `Player <span>${currentPlayer}</span>'s Turn`;
}

function updateScore() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreDraw.textContent = scores.Draw;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    statusText.innerHTML = `Player <span>${currentPlayer}</span>'s Turn`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.className = "cell";
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);