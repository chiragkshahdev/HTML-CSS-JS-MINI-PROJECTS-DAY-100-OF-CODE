const SIZE = 4;
let grid = [];
let score = 0;
let best = parseInt(localStorage.getItem('game2048_best')) || 0;
let topScores = JSON.parse(localStorage.getItem('game2048_top')) || [];
let moves = 0;
let undoLeft = 3;
let history = []; // For undo
let hasWon = false;
let isOver = false;
let soundOn = true;

function showToast(m) {
  const t = document.getElementById('toast');
  t.textContent = m; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}
function beep(freq = 500) {
  if (!soundOn) return;
  try {
    const a = new (window.AudioContext || window.webkitAudioContext)();
    const o = a.createOscillator(); o.frequency.value = freq; o.connect(a.destination); o.start();
    setTimeout(() => o.stop(), 70);
  } catch(e) {}
}

// --- CORE 2048 LOGIC ---
function createEmptyGrid() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function getEmptyCells(g = grid) {
  const cells = [];
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) if (g[r][c] === 0) cells.push({ r, c });
  return cells;
}

function addRandomTile() {
  const empty = getEmptyCells();
  if (!empty.length) return;
  const { r, c } = empty[Math.floor(Math.random() * empty.length)];
  grid[r][c] = Math.random() < 0.9 ? 2 : 4;
  // Mark for pop animation
  document.querySelector(`[data-r="${r}"][data-c="${c}"]`)?.classList.add('pop');
}

function slideAndMerge(row) {
  // Step 1: Remove zeros
  let arr = row.filter(v => v !== 0);
  let gained = 0;
  let mergedFlags = new Array(arr.length).fill(false);
  // Step 2: Merge adjacent equal
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i] *= 2;
      gained += arr[i];
      arr.splice(i + 1, 1);
      mergedFlags.splice(i + 1, 1);
      mergedFlags[i] = true; // This tile was merged
      i++; // Skip next, can't merge twice in one move
    }
  }
  // Step 3: Pad with zeros
  while (arr.length < SIZE) { arr.push(0); mergedFlags.push(false); }
  return { newRow: arr, gained, mergedFlags };
}

function move(dir) {
  if (isOver) return;
  // Save for undo
  const prevGrid = JSON.parse(JSON.stringify(grid));
  const prevScore = score;
  const prevMoves = moves;

  let moved = false;
  let totalGained = 0;

  if (dir === 'left' || dir === 'right') {
    for (let r = 0; r < SIZE; r++) {
      let row = [...grid[r]];
      if (dir === 'right') row.reverse();
      const { newRow, gained } = slideAndMerge(row);
      let finalRow = dir === 'right' ? newRow.reverse() : newRow;
      if (JSON.stringify(finalRow) !== JSON.stringify(grid[r])) moved = true;
      grid[r] = finalRow;
      totalGained += gained;
    }
  } else {
    // Up / Down - transpose logic
    for (let c = 0; c < SIZE; c++) {
      let col = [];
      for (let r = 0; r < SIZE; r++) col.push(grid[r][c]);
      if (dir === 'down') col.reverse();
      const { newRow, gained } = slideAndMerge(col);
      let finalCol = dir === 'down' ? newRow.reverse() : newRow;
      for (let r = 0; r < SIZE; r++) {
        if (grid[r][c] !== finalCol[r]) moved = true;
        grid[r][c] = finalCol[r];
      }
      totalGained += gained;
    }
  }

  if (!moved) return; // Invalid move - no tile added

  // Save history for undo
  history.push({ grid: prevGrid, score: prevScore, moves: prevMoves });
  if (history.length > 10) history.shift();

  score += totalGained;
  moves++;
  if (score > best) { best = score; localStorage.setItem('game2048_best', best); }
  if (totalGained > 0) beep(600 + Math.min(totalGained, 500));

  addRandomTile();
  render();
  updateUI();
  checkGameState();
}

function checkGameState() {
  const max = Math.max(...grid.flat());
  // Win check
  if (max >= 2048 && !hasWon) {
    hasWon = true;
    showWin();
    return;
  }
  // Lose check: No empty + No adjacent equal
  if (getEmptyCells().length === 0 && !canMove()) {
    gameOver();
  }
}

function canMove() {
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) {
    if (c < SIZE - 1 && grid[r][c] === grid[r][c + 1]) return true;
    if (r < SIZE - 1 && grid[r][c] === grid[r + 1][c]) return true;
  }
  return false;
}

function showWin() {
  document.getElementById('statusBadge').textContent = 'You Won! 🎉 2048!';
  document.getElementById('statusBadge').className = 'badge win';
  const overlay = document.getElementById('overlay');
  overlay.classList.remove('hidden');
  document.getElementById('overlayTitle').textContent = 'You Made 2048! 🎉';
  document.getElementById('overlayText').textContent = 'Legend! Continue to go for 4096?';
  document.getElementById('overlayScore').classList.remove('hidden');
  document.getElementById('finalScore').textContent = score;
  document.getElementById('finalBest').textContent = best;
  document.getElementById('finalMax').textContent = Math.max(...grid.flat());
  document.getElementById('overlayBtn').textContent = '🆕 New Game';
  document.getElementById('continueBtn').classList.remove('hidden');
  beep(900);
  saveTop();
}

function gameOver() {
  isOver = true;
  document.getElementById('statusBadge').textContent = 'Game Over 💀';
  document.getElementById('statusBadge').className = 'badge over';
  const overlay = document.getElementById('overlay');
  overlay.classList.remove('hidden');
  document.getElementById('overlayTitle').textContent = 'Game Over! 💀';
  document.getElementById('overlayText').textContent = 'No more moves possible!';
  document.getElementById('overlayScore').classList.remove('hidden');
  document.getElementById('finalScore').textContent = score;
  document.getElementById('finalBest').textContent = best;
  document.getElementById('finalMax').textContent = Math.max(...grid.flat());
  document.getElementById('overlayBtn').textContent = '🔄 Try Again';
  document.getElementById('continueBtn').classList.add('hidden');
  beep(200);
  saveTop();
  showToast(`Game Over! Score: ${score}`);
}

function saveTop() {
  topScores.push(score); topScores.sort((a,b)=>b-a); topScores = topScores.slice(0,5);
  localStorage.setItem('game2048_top', JSON.stringify(topScores));
  updateUI();
}

function render() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const val = grid[r][c];
      const div = document.createElement('div');
      div.className = 'cell' + (val ? ` t-${val <= 2048 ? val : 'super'}` : '');
      div.dataset.r = r; div.dataset.c = c;
      div.textContent = val || '';
      board.appendChild(div);
    }
  }
}

function updateUI() {
  const max = grid.length ? Math.max(...grid.flat()) : 0;
  document.getElementById('score').textContent = score;
  document.getElementById('scoreTop').textContent = score;
  document.getElementById('best').textContent = best;
  document.getElementById('bestTop').textContent = best;
  document.getElementById('moves').textContent = moves;
  document.getElementById('maxTile').textContent = max || 0;
  document.getElementById('undoLeft').textContent = undoLeft;
  document.getElementById('topList').innerHTML = topScores.length
    ? topScores.slice(0,5).map((s,i)=>`<li>${s} pts ${i===0?'👑':''}</li>`).join('')
    : '<li style="list-style:none">No scores yet</li>';
}

function newGame() {
  grid = createEmptyGrid();
  score = 0; moves = 0; undoLeft = 3; history = []; hasWon = false; isOver = false;
  addRandomTile(); addRandomTile();
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('continueBtn').classList.add('hidden');
  document.getElementById('overlayScore').classList.add('hidden');
  document.getElementById('statusBadge').textContent = 'Make 2048!';
  document.getElementById('statusBadge').className = 'badge';
  render(); updateUI();
  showToast('New Game Started! Good Luck 🍀');
}

function undo() {
  if (undoLeft <= 0) return showToast('No undo left! 😢');
  if (!history.length) return showToast('Nothing to undo!');
  const last = history.pop();
  grid = last.grid; score = last.score; moves = last.moves;
  undoLeft--; isOver = false;
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('statusBadge').textContent = 'Make 2048!';
  document.getElementById('statusBadge').className = 'badge';
  render(); updateUI();
  showToast(`Undo done! ${undoLeft} left ↩️`);
}

// --- CONTROLS ---
document.addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  if (k === 'arrowup' || k === 'w') { e.preventDefault(); move('up'); }
  else if (k === 'arrowdown' || k === 's') { e.preventDefault(); move('down'); }
  else if (k === 'arrowleft' || k === 'a') { e.preventDefault(); move('left'); }
  else if (k === 'arrowright' || k === 'd') { e.preventDefault(); move('right'); }
  else if (k === 'u') undo();
  else if (k === 'r') newGame();
});

document.querySelectorAll('.mobile-controls button').forEach(b => {
  b.addEventListener('click', () => move(b.dataset.dir));
});

// Swipe
let startX = 0, startY = 0;
const wrap = document.getElementById('boardWrap');
wrap.addEventListener('touchstart', e => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }, { passive: true });
wrap.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - startX;
  const dy = e.changedTouches[0].clientY - startY;
  if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return; // Tap, not swipe
  if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 'right' : 'left');
  else move(dy > 0 ? 'down' : 'up');
}, { passive: true });

document.getElementById('newBtn').addEventListener('click', newGame);
document.getElementById('overlayBtn').addEventListener('click', newGame);
document.getElementById('undoBtn').addEventListener('click', undo);
document.getElementById('continueBtn').addEventListener('click', () => {
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('statusBadge').textContent = 'Going for 4096! 🔥';
});
document.getElementById('soundBtn').addEventListener('click', function() {
  soundOn = !soundOn; this.textContent = soundOn ? '🔊 Sound: ON' : '🔇 Sound: OFF';
});
document.getElementById('themeBtn').addEventListener('click', function() {
  const dark = document.body.classList.toggle('dark');
  this.textContent = dark ? '☀️ Light' : '🌙 Dark';
});

// Init
newGame();