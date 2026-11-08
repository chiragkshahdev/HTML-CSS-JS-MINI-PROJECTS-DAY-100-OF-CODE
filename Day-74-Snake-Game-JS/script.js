const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRID = 20;
const CELL = canvas.width / GRID;

let snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
let dir = { x: 1, y: 0 };
let nextDir = { x: 1, y: 0 };
let food = { x: 15, y: 10, type: 'normal' };
let score = 0;
let best = parseInt(localStorage.getItem('snake_best')) || 0;
let topScores = JSON.parse(localStorage.getItem('snake_top')) || [];
let gameInterval = null;
let speed = 150;
let isPlaying = false;
let isPaused = false;
let startTime = 0;
let timerInterval = null;
let soundOn = true;

function showToast(m) {
  const t = document.getElementById('toast');
  t.textContent = m; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}
function beep(freq = 500) {
  if (!soundOn) return;
  try {
    const audio = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audio.createOscillator();
    osc.frequency.value = freq; osc.connect(audio.destination); osc.start();
    setTimeout(() => osc.stop(), 80);
  } catch(e) {}
}

// --- DRAW ---
function draw() {
  // Background grid
  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,0.03)';
  for (let i = 0; i < GRID; i++) for (let j = 0; j < GRID; j++) {
    if ((i + j) % 2 === 0) ctx.fillRect(i * CELL, j * CELL, CELL, CELL);
  }

  // Food
  const fx = food.x * CELL, fy = food.y * CELL;
  if (food.type === 'golden') {
    ctx.font = `${CELL}px Arial`;
    ctx.fillText('🌟', fx, fy + CELL - 2);
  } else {
    ctx.font = `${CELL}px Arial`;
    ctx.fillText('🍎', fx, fy + CELL - 2);
  }

  // Snake
  snake.forEach((seg, i) => {
    const x = seg.x * CELL, y = seg.y * CELL;
    if (i === 0) {
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(x, y, CELL - 1, CELL - 1);
      // Eyes
      ctx.fillStyle = '#fff';
      ctx.fillRect(x + 4, y + 4, 4, 4);
      ctx.fillRect(x + 12, y + 4, 4, 4);
      ctx.fillStyle = '#111';
      ctx.fillRect(x + 5, y + 5, 2, 2);
      ctx.fillRect(x + 13, y + 5, 2, 2);
    } else {
      ctx.fillStyle = i % 2 === 0 ? '#16a34a' : '#4ade80';
      ctx.fillRect(x + 1, y + 1, CELL - 2, CELL - 2);
    }
  });
}

function placeFood() {
  let pos;
  do {
    pos = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  // 15% chance golden
  food = { ...pos, type: Math.random() < 0.15 ? 'golden' : 'normal' };
}

function updateScore() {
  document.getElementById('score').textContent = score;
  document.getElementById('scoreTop').textContent = score;
  document.getElementById('length').textContent = snake.length;
  document.getElementById('best').textContent = best;
  document.getElementById('bestTop').textContent = best;
  document.getElementById('topList').innerHTML = topScores.length
    ? topScores.slice(0, 5).map((s, i) => `<li>${s} points ${i === 0 ? '👑' : ''}</li>`).join('')
    : '<li style="list-style:none">No scores yet</li>';
}

// --- GAME LOOP ---
function step() {
  if (isPaused) return;
  dir = nextDir;
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  // Wall collision
  if (head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID) return gameOver();
  // Self collision
  if (snake.some(s => s.x === head.x && s.y === head.y)) return gameOver();

  snake.unshift(head);

  // Eat food?
  if (head.x === food.x && head.y === food.y) {
    const points = food.type === 'golden' ? 50 : 10;
    score += points;
    beep(food.type === 'golden' ? 900 : 600);
    if (food.type === 'golden') showToast('🌟 Golden Apple! +50');
    else showToast('🍎 +10');
    if (score > best) { best = score; localStorage.setItem('snake_best', best); }
    placeFood();
  } else {
    snake.pop();
  }
  updateScore();
  draw();
}

function startGame() {
  snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
  dir = { x: 1, y: 0 }; nextDir = { x: 1, y: 0 };
  score = 0; isPaused = false; isPlaying = true;
  placeFood();
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  startTime = Date.now();
  gameInterval = setInterval(step, speed);
  timerInterval = setInterval(() => {
    document.getElementById('timer').textContent = Math.floor((Date.now() - startTime) / 1000) + 's';
  }, 1000);
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('statusBadge').textContent = 'Playing 🟢';
  document.getElementById('statusBadge').className = 'badge';
  document.getElementById('startBtn').textContent = '🔄 Restart';
  updateScore(); draw();
  showToast('Game Started! Good Luck 🐍');
}

function gameOver() {
  clearInterval(gameInterval); clearInterval(timerInterval);
  isPlaying = false;
  beep(200);
  topScores.push(score); topScores.sort((a,b)=>b-a); topScores = topScores.slice(0,5);
  localStorage.setItem('snake_top', JSON.stringify(topScores));
  updateScore();
  const overlay = document.getElementById('overlay');
  overlay.classList.remove('hidden');
  document.getElementById('overlayTitle').textContent = 'Game Over! 💀';
  document.getElementById('overlayText').textContent = `Score: ${score} | Best: ${best} | Length: ${snake.length}`;
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
  if (isPaused) showToast('Paused ⏸️'); else showToast('Resumed ▶️');
}

function setDir(x, y) {
  // Prevent reverse
  if (dir.x === -x && dir.y === -y) return;
  if (dir.x === x && dir.y === y) return;
  // Also prevent immediate reverse from nextDir
  if (nextDir.x === -x && nextDir.y === -y) return;
  nextDir = { x, y };
}

// --- CONTROLS ---
document.addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  if (k === 'arrowup' || k === 'w') { e.preventDefault(); setDir(0, -1); }
  else if (k === 'arrowdown' || k === 's') { e.preventDefault(); setDir(0, 1); }
  else if (k === 'arrowleft' || k === 'a') { e.preventDefault(); setDir(-1, 0); }
  else if (k === 'arrowright' || k === 'd') { e.preventDefault(); setDir(1, 0); }
  else if (k === ' ') { e.preventDefault(); if (!isPlaying) startGame(); else togglePause(); }
  else if (k === 'enter') { startGame(); }
});

document.querySelectorAll('.mobile-controls button').forEach(b => {
  b.addEventListener('click', () => {
    const d = b.dataset.dir;
    if (d === 'up') setDir(0, -1);
    if (d === 'down') setDir(0, 1);
    if (d === 'left') setDir(-1, 0);
    if (d === 'right') setDir(1, 0);
    if (!isPlaying) startGame();
  });
});

// Swipe on canvas
let touchX = 0, touchY = 0;
canvas.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; touchY = e.touches[0].clientY; }, { passive: true });
canvas.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchX;
  const dy = e.changedTouches[0].clientY - touchY;
  if (Math.abs(dx) > Math.abs(dy)) setDir(dx > 0 ? 1 : -1, 0);
  else setDir(0, dy > 0 ? 1 : -1);
  if (!isPlaying) startGame();
}, { passive: true });

// Buttons
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('overlayBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', togglePause);
document.getElementById('resetBtn').addEventListener('click', () => {
  clearInterval(gameInterval); clearInterval(timerInterval);
  isPlaying = false; isPaused = false;
  snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
  score = 0; document.getElementById('timer').textContent = '0s';
  document.getElementById('overlay').classList.remove('hidden');
  document.getElementById('overlayTitle').textContent = 'Snake Game';
  document.getElementById('overlayText').textContent = 'Press Start or Space to play';
  document.getElementById('overlayBtn').textContent = '▶️ Start';
  document.getElementById('statusBadge').textContent = 'Press Start';
  document.getElementById('statusBadge').className = 'badge';
  updateScore(); draw();
  showToast('Game Reset 🔄');
});

document.querySelectorAll('.diff').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.diff').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  speed = parseInt(b.dataset.speed);
  if (isPlaying) { clearInterval(gameInterval); gameInterval = setInterval(step, speed); }
  showToast('Speed: ' + b.textContent);
}));

document.getElementById('soundBtn').addEventListener('click', function() {
  soundOn = !soundOn;
  this.textContent = soundOn ? '🔊 Sound: ON' : '🔇 Sound: OFF';
});
document.getElementById('darkBtn').addEventListener('click', function() {
  const light = document.body.classList.toggle('light');
  this.textContent = light ? '🌙' : '☀️';
});

updateScore();
draw();