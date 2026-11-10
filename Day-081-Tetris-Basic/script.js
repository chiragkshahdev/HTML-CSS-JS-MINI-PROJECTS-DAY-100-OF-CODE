const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const nextCtx = document.getElementById('nextCanvas').getContext('2d');
const holdCtx = document.getElementById('holdCanvas').getContext('2d');

const COLS = 10, ROWS = 20, CELL = 30;
canvas.width = COLS * CELL; canvas.height = ROWS * CELL;

// 7 Tetrominoes - SRS shapes
const PIECES = {
  I: { shape: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], color: '#22d3ee' },
  J: { shape: [[1,0,0],[1,1,1],[0,0,0]], color: '#3b82f6' },
  L: { shape: [[0,0,1],[1,1,1],[0,0,0]], color: '#f97316' },
  O: { shape: [[1,1],[1,1]], color: '#facc15' },
  S: { shape: [[0,1,1],[1,1,0],[0,0,0]], color: '#22c55e' },
  T: { shape: [[0,1,0],[1,1,1],[0,0,0]], color: '#a855f7' },
  Z: { shape: [[1,1,0],[0,1,1],[0,0,0]], color: '#ef4444' }
};
const KEYS = Object.keys(PIECES);

let board = [];
let current = null;
let nextPiece = null;
let holdPiece = null;
let canHold = true;
let score = 0, lines = 0, level = 1;
let best = parseInt(localStorage.getItem('tetris_best')) || 0;
let topScores = JSON.parse(localStorage.getItem('tetris_top')) || [];
let isPlaying = false, isPaused = false, isOver = false;
let dropCounter = 0, lastTime = 0, animationId = null;
let soundOn = true;

function showToast(m) {
  const t = document.getElementById('toast');
  t.textContent = m; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}
function beep(freq = 500, dur = 60) {
  if (!soundOn) return;
  try {
    const a = new (window.AudioContext || window.webkitAudioContext)();
    const o = a.createOscillator(); o.frequency.value = freq; o.connect(a.destination); o.start();
    setTimeout(() => o.stop(), dur);
  } catch(e) {}
}

function createBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function randomPiece() {
  const key = KEYS[Math.floor(Math.random() * KEYS.length)];
  return { key, shape: PIECES[key].shape.map(r => [...r]), color: PIECES[key].color, x: 3, y: 0 };
}

function rotate(matrix, dir = 1) {
  // Transpose + Reverse = Rotate
  const N = matrix.length;
  const res = Array.from({ length: N }, () => Array(N).fill(0));
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    if (dir === 1) res[x][N - 1 - y] = matrix[y][x];
    else res[N - 1 - x][y] = matrix[y][x];
  }
  return res;
}

function collides(piece, offsetX = 0, offsetY = 0, shape = piece.shape) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const nx = piece.x + x + offsetX;
        const ny = piece.y + y + offsetY;
        if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
        if (ny >= 0 && board[ny][nx]) return true;
      }
    }
  }
  return false;
}

function merge() {
  current.shape.forEach((row, y) => row.forEach((v, x) => {
    if (v) {
      const by = current.y + y, bx = current.x + x;
      if (by >= 0) board[by][bx] = current.color;
    }
  }));
}

function clearLines() {
  let cleared = 0;
  for (let y = ROWS - 1; y >= 0; y--) {
    if (board[y].every(cell => cell !== 0)) {
      board.splice(y, 1);
      board.unshift(Array(COLS).fill(0));
      cleared++;
      y++; // Recheck same row (new row shifted down)
    }
  }
  if (cleared > 0) {
    // Scoring: 1=100, 2=300, 3=500, 4=800 (Tetris)
    const points = [0, 100, 300, 500, 800][cleared] * level;
    score += points;
    lines += cleared;
    const newLevel = Math.floor(lines / 10) + 1;
    if (newLevel > level) { level = newLevel; showToast(`Level ${level} Up! Speed ++ 🚀`); beep(900); }
    if (score > best) { best = score; localStorage.setItem('tetris_best', best); }
    beep(700);
    if (cleared === 4) showToast('TETRIS! +800 🔥🔥🔥');
    else if (cleared > 1) showToast(`${cleared} Lines! +${points} 🎉`);
    updateUI();
  }
}

function spawn() {
  current = nextPiece || randomPiece();
  nextPiece = randomPiece();
  current.x = Math.floor((COLS - current.shape[0].length) / 2);
  current.y = 0;
  canHold = true;
  if (collides(current)) return gameOver();
  drawPreview();
}

function hold() {
  if (!canHold || !isPlaying) return;
  beep(600);
  if (!holdPiece) {
    holdPiece = { key: current.key, shape: PIECES[current.key].shape.map(r => [...r]), color: current.color };
    spawn();
  } else {
    const temp = holdPiece;
    holdPiece = { key: current.key, shape: PIECES[current.key].shape.map(r => [...r]), color: current.color };
    current = { key: temp.key, shape: temp.shape.map(r => [...r]), color: temp.color, x: 3, y: 0 };
    current.x = Math.floor((COLS - current.shape[0].length) / 2);
    if (collides(current)) return gameOver();
  }
  canHold = false;
  drawPreview();
}

function hardDrop() {
  if (!isPlaying || isPaused) return;
  while (!collides(current, 0, 1)) current.y++;
  merge(); clearLines(); spawn();
  beep(500);
  updateUI();
}

function getGhostY() {
  let y = current.y;
  while (!collides(current, 0, y - current.y + 1)) y++;
  return y;
}

function drawCell(x, y, color, ghost = false) {
  ctx.fillStyle = ghost ? 'rgba(255,255,255,0.12)' : color;
  ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
  if (!ghost) {
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.fillRect(x * CELL, y * CELL, CELL, 4);
    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(x * CELL, y * CELL + CELL - 4, CELL, 4);
  }
  ctx.strokeStyle = ghost ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  ctx.strokeRect(x * CELL, y * CELL, CELL, CELL);
}

function draw() {
  ctx.fillStyle = '#020617'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  for (let x = 0; x <= COLS; x++) { ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, canvas.height); ctx.stroke(); }
  for (let y = 0; y <= ROWS; y++) { ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(canvas.width, y * CELL); ctx.stroke(); }
  // Locked board
  board.forEach((row, y) => row.forEach((color, x) => { if (color) drawCell(x, y, color); }));
  if (!current) return;
  // Ghost piece
  const ghostY = getGhostY();
  current.shape.forEach((row, y) => row.forEach((v, x) => {
    if (v && ghostY + y !== current.y + y) drawCell(current.x + x, ghostY + y, current.color, true);
  }));
  // Current piece
  current.shape.forEach((row, y) => row.forEach((v, x) => {
    if (v) drawCell(current.x + x, current.y + y, current.color);
  }));
}

function drawPreview() {
  // Next
  nextCtx.clearRect(0, 0, 80, 80);
  if (nextPiece) {
    const s = nextPiece.shape, size = 16;
    const offsetX = (80 - s[0].length * size) / 2, offsetY = (80 - s.length * size) / 2;
    s.forEach((row, y) => row.forEach((v, x) => {
      if (v) { nextCtx.fillStyle = nextPiece.color; nextCtx.fillRect(offsetX + x * size, offsetY + y * size, size - 1, size - 1); }
    }));
  }
  // Hold
  holdCtx.clearRect(0, 0, 80, 80);
  if (holdPiece) {
    const s = holdPiece.shape, size = 16;
    const offsetX = (80 - s[0].length * size) / 2, offsetY = (80 - s.length * size) / 2;
    s.forEach((row, y) => row.forEach((v, x) => {
      if (v) { holdCtx.fillStyle = canHold ? holdPiece.color : '#555'; holdCtx.fillRect(offsetX + x * size, offsetY + y * size, size - 1, size - 1); }
    }));
  }
}

function updateUI() {
  document.getElementById('score').textContent = score;
  document.getElementById('scoreTop').textContent = score;
  document.getElementById('best').textContent = best;
  document.getElementById('lines').textContent = lines;
  document.getElementById('linesTop').textContent = lines;
  document.getElementById('level').textContent = level;
  document.getElementById('levelTop').textContent = level;
  document.getElementById('topList').innerHTML = topScores.length
    ? topScores.slice(0,5).map((s,i)=>`<li>${s} pts ${i===0?'👑':''}</li>`).join('')
    : '<li style="list-style:none">No scores yet</li>';
}

function move(dir) {
  if (!isPlaying || isPaused) return;
  if (!collides(current, dir, 0)) current.x += dir;
  draw();
}
function rotatePiece() {
  if (!isPlaying || isPaused) return;
  const rotated = rotate(current.shape, 1);
  // Wall kick: try offsets
  const kicks = [0, -1, 1, -2, 2];
  for (const k of kicks) {
    if (!collides(current, k, 0, rotated)) {
      current.shape = rotated;
      current.x += k;
      beep(400);
      break;
    }
  }
  draw();
}
function softDrop() {
  if (!isPlaying || isPaused) return;
  if (!collides(current, 0, 1)) { current.y++; score += 1; updateUI(); }
  else { merge(); clearLines(); spawn(); }
  draw();
}

function loop(time = 0) {
  if (isPaused) { animationId = requestAnimationFrame(loop); return; }
  const delta = time - lastTime;
  lastTime = time;
  dropCounter += delta;
  const dropInterval = Math.max(80, 800 - (level - 1) * 70); // Speed up per level
  if (dropCounter > dropInterval) {
    if (!collides(current, 0, 1)) current.y++;
    else { merge(); clearLines(); spawn(); if (isOver) return; }
    dropCounter = 0;
  }
  draw();
  animationId = requestAnimationFrame(loop);
}

function startGame() {
  board = createBoard();
  score = 0; lines = 0; level = 1; isOver = false; canHold = true;
  holdPiece = null; nextPiece = randomPiece();
  isPlaying = true; isPaused = false;
  cancelAnimationFrame(animationId);
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('overlayScore').classList.add('hidden');
  document.getElementById('statusBadge').textContent = 'Playing 🟢';
  document.getElementById('statusBadge').className = 'badge';
  spawn(); updateUI(); drawPreview();
  lastTime = 0; dropCounter = 0;
  animationId = requestAnimationFrame(loop);
  showToast('Tetris Started! 🧱');
}

function gameOver() {
  cancelAnimationFrame(animationId);
  isPlaying = false; isOver = true;
  beep(200, 200);
  topScores.push(score); topScores.sort((a,b)=>b-a); topScores = topScores.slice(0,5);
  localStorage.setItem('tetris_top', JSON.stringify(topScores));
  localStorage.setItem('tetris_best', best);
  updateUI();
  const overlay = document.getElementById('overlay');
  overlay.classList.remove('hidden');
  document.getElementById('overlayTitle').textContent = 'GAME OVER 💀';
  document.getElementById('overlayText').textContent = 'Stack reached top!';
  document.getElementById('overlayScore').classList.remove('hidden');
  document.getElementById('finalScore').textContent = score;
  document.getElementById('finalLines').textContent = lines;
  document.getElementById('finalLevel').textContent = level;
  document.getElementById('finalBest').textContent = best;
  document.getElementById('overlayBtn').textContent = '🔄 Play Again';
  document.getElementById('statusBadge').textContent = 'Game Over';
  document.getElementById('statusBadge').className = 'badge over';
  showToast(`Game Over! Score: ${score}`);
}

function togglePause() {
  if (!isPlaying) return;
  isPaused = !isPaused;
  document.getElementById('statusBadge').textContent = isPaused ? 'Paused ⏸️' : 'Playing 🟢';
  document.getElementById('statusBadge').className = isPaused ? 'badge paused' : 'badge';
  document.getElementById('pauseBtn').textContent = isPaused ? '▶️ Resume' : '⏸️ Pause';
  showToast(isPaused ? 'Paused ⏸️' : 'Resumed ▶️');
}

// --- CONTROLS ---
document.addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  if (k === 'arrowleft') { e.preventDefault(); move(-1); }
  else if (k === 'arrowright') { e.preventDefault(); move(1); }
  else if (k === 'arrowdown') { e.preventDefault(); softDrop(); }
  else if (k === 'arrowup' || k === 'x') { e.preventDefault(); rotatePiece(); }
  else if (k === ' ') { e.preventDefault(); if (!isPlaying) startGame(); else hardDrop(); }
  else if (k === 'c') hold();
  else if (k === 'p') togglePause();
  else if (k === 'enter') startGame();
});

document.getElementById('leftBtn').addEventListener('click', () => move(-1));
document.getElementById('rightBtn').addEventListener('click', () => move(1));
document.getElementById('downBtn').addEventListener('click', softDrop);
document.getElementById('rotateBtn').addEventListener('click', rotatePiece);
document.getElementById('dropBtn').addEventListener('click', hardDrop);
document.getElementById('holdBtn').addEventListener('click', hold);

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('overlayBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', togglePause);
document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm('Reset best score?')) return;
  best = 0; topScores = []; localStorage.removeItem('tetris_best'); localStorage.removeItem('tetris_top');
  score = 0; updateUI(); showToast('Reset done 🔄');
});
document.getElementById('soundBtn').addEventListener('click', function() {
  soundOn = !soundOn; this.textContent = soundOn ? '🔊 Sound: ON' : '🔇 Sound: OFF';
});
document.getElementById('themeBtn').addEventListener('click', function() {
  const light = document.body.classList.toggle('light');
  this.textContent = light ? '🌙 Dark' : '☀️ Light';
});

// Init
board = createBoard();
current = randomPiece(); nextPiece = randomPiece();
updateUI(); draw(); drawPreview();