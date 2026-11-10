const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;

let paddle = { w: 100, h: 12, x: W/2 - 50, y: H - 30, speed: 8 };
let balls = [];
let bricks = [];
let powers = [];
let score = 0;
let best = parseInt(localStorage.getItem('brick_best')) || 0;
let topScores = JSON.parse(localStorage.getItem('brick_top')) || [];
let lives = 3;
let level = 1;
let isPlaying = false, isPaused = false, ballStuck = true;
let animationId = null;
let difficulty = 'easy';
let soundOn = true;
let activePower = 'None';
let powerTimer = null;
let keys = {};

const DIFFS = {
  easy: { ballSpeed: 3.5, paddleW: 110, rows: 4 },
  medium: { ballSpeed: 4.5, paddleW: 95, rows: 5 },
  hard: { ballSpeed: 5.5, paddleW: 80, rows: 6 }
};
const COLORS = ['#ef4444','#f97316','#facc15','#22c55e','#3b82f6','#a855f7'];

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

function updateUI() {
  document.getElementById('score').textContent = score;
  document.getElementById('scoreTop').textContent = score;
  document.getElementById('best').textContent = best;
  document.getElementById('lives').textContent = lives;
  document.getElementById('livesTop').textContent = lives;
  document.getElementById('level').textContent = level;
  document.getElementById('levelTop').textContent = level;
  document.getElementById('bricksLeft').textContent = bricks.filter(b=>!b.broken).length;
  document.getElementById('activePower').textContent = activePower;
  document.getElementById('topList').innerHTML = topScores.length
    ? topScores.slice(0,5).map((s,i)=>`<li>${s} pts ${i===0?'👑':''}</li>`).join('')
    : '<li style="list-style:none">No scores yet</li>';
}

function createBricks() {
  bricks = [];
  const cfg = DIFFS[difficulty];
  const rows = cfg.rows + (level - 1); // Level up = more rows
  const cols = 6;
  const bw = (W - 40) / cols;
  const bh = 22;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Random: 15% power brick, 10% 2-hit brick
      const isPower = Math.random() < 0.15;
      const isHard = Math.random() < 0.10;
      bricks.push({
        x: 20 + c * bw, y: 60 + r * (bh + 8),
        w: bw - 6, h: bh,
        color: COLORS[r % COLORS.length],
        hits: isHard ? 2 : 1, maxHits: isHard ? 2 : 1,
        isPower, isHard, broken: false,
        powerType: isPower ? ['wide','multi','slow','life'][Math.floor(Math.random()*4)] : null
      });
    }
  }
}

function resetBall() {
  balls = [{ x: paddle.x + paddle.w/2, y: paddle.y - 10, dx: 0, dy: 0, r: 8, speed: DIFFS[difficulty].ballSpeed + (level-1)*0.5 }];
  ballStuck = true;
}

function launchBall() {
  if (!ballStuck || !isPlaying) return;
  const b = balls[0];
  const angle = (Math.random() * 0.6 - 0.3); // -0.3 to 0.3
  b.dx = Math.sin(angle) * b.speed;
  b.dy = -Math.cos(angle) * b.speed;
  ballStuck = false;
  document.getElementById('tapHint').classList.add('hidden');
  beep(600);
}

function applyPower(type) {
  clearTimeout(powerTimer);
  if (type === 'wide') {
    activePower = '🔵 Wide Paddle (8s)';
    paddle.w = DIFFS[difficulty].paddleW + 60;
    powerTimer = setTimeout(() => { paddle.w = DIFFS[difficulty].paddleW; activePower = 'None'; updateUI(); }, 8000);
  } else if (type === 'multi') {
    activePower = '🔴 Multi Ball!';
    const main = balls[0];
    if (main) {
      balls.push({ ...main, dx: -main.dx, dy: main.dy });
      balls.push({ ...main, dx: main.dx * 0.5, dy: -Math.abs(main.dy) });
    }
    setTimeout(() => activePower = 'None', 3000);
  } else if (type === 'slow') {
    activePower = '🟢 Slow Ball (6s)';
    balls.forEach(b => { b.dx *= 0.6; b.dy *= 0.6; });
    powerTimer = setTimeout(() => { balls.forEach(b => { b.dx /= 0.6; b.dy /= 0.6; }); activePower = 'None'; updateUI(); }, 6000);
  } else if (type === 'life') {
    lives++; activePower = '⭐ +1 Life!';
    setTimeout(() => activePower = 'None', 3000);
  }
  updateUI();
}

// --- DRAW ---
function draw() {
  ctx.fillStyle = '#020617'; ctx.fillRect(0,0,W,H);
  // Grid dots
  ctx.fillStyle = 'rgba(255,255,255,0.04)';
  for (let i=0;i<W;i+=40) for (let j=0;j<H;j+=40) ctx.fillRect(i,j,1,1);

  // Bricks
  bricks.forEach(b => {
    if (b.broken) return;
    ctx.fillStyle = b.color;
    if (b.isHard && b.hits === 1) ctx.fillStyle = '#fff';
    ctx.fillRect(b.x, b.y, b.w, b.h);
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(b.x, b.y, b.w, 4);
    if (b.isPower) { ctx.font = '14px Arial'; ctx.fillStyle = '#fff'; ctx.fillText('✨', b.x + b.w/2 - 7, b.y + 16); }
    if (b.isHard) { ctx.font = 'bold 12px Arial'; ctx.fillStyle = '#111'; ctx.fillText(b.hits === 2 ? '2' : '1', b.x + b.w/2 - 4, b.y + 15); }
  });

  // Powers falling
  powers.forEach(p => {
    ctx.font = '20px Arial'; ctx.fillText(p.icon, p.x, p.y);
  });

  // Paddle
  const grad = ctx.createLinearGradient(paddle.x, 0, paddle.x + paddle.w, 0);
  grad.addColorStop(0, '#f97316'); grad.addColorStop(1, '#facc15');
  ctx.fillStyle = grad;
  ctx.beginPath(); ctx.roundRect(paddle.x, paddle.y, paddle.w, paddle.h, 6); ctx.fill();

  // Balls
  balls.forEach(b => {
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.arc(b.x-2, b.y-2, 3, 0, Math.PI*2); ctx.fill();
  });

  // Aiming line when stuck
  if (ballStuck && isPlaying) {
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.setLineDash([5,5]);
    ctx.beginPath(); ctx.moveTo(balls[0].x, balls[0].y); ctx.lineTo(balls[0].x, balls[0].y - 40); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#fff'; ctx.font = '12px Arial'; ctx.textAlign = 'center';
    ctx.fillText('Press SPACE to Launch', W/2, H - 60);
  }
}

function update() {
  // Paddle move via keys
  if (keys['arrowleft'] || keys['a']) paddle.x -= paddle.speed;
  if (keys['arrowright'] || keys['d']) paddle.x += paddle.speed;
  paddle.x = Math.max(0, Math.min(W - paddle.w, paddle.x));

  if (ballStuck && balls.length) {
    balls[0].x = paddle.x + paddle.w/2;
    balls[0].y = paddle.y - 10;
    return;
  }

  // Powers fall
  powers.forEach(p => p.y += 3);
  powers = powers.filter(p => p.y < H);
  powers.forEach((p, idx) => {
    if (p.x > paddle.x && p.x < paddle.x + paddle.w && p.y > paddle.y && p.y < paddle.y + 20) {
      applyPower(p.type); beep(900);
      showToast(`Power-up: ${p.type.toUpperCase()}!`);
      powers.splice(idx, 1);
    }
  });

  // Balls
  balls.forEach((b, bi) => {
    b.x += b.dx; b.y += b.dy;

    // Walls
    if (b.x - b.r < 0 || b.x + b.r > W) { b.dx = -b.dx; beep(300, 30); }
    if (b.y - b.r < 0) { b.dy = -b.dy; beep(300, 30); }

    // Paddle
    if (b.y + b.r > paddle.y && b.y + b.r < paddle.y + 20 && b.x > paddle.x && b.x < paddle.x + paddle.w && b.dy > 0) {
      // Angle based on hit position
      const hitPos = (b.x - paddle.x) / paddle.w - 0.5; // -0.5 to 0.5
      const angle = hitPos * Math.PI / 3; // -60deg to 60deg
      const speed = Math.hypot(b.dx, b.dy);
      b.dx = Math.sin(angle) * speed;
      b.dy = -Math.cos(angle) * speed;
      beep(500);
    }

    // Bricks
    bricks.forEach(br => {
      if (br.broken) return;
      if (b.x + b.r > br.x && b.x - b.r < br.x + br.w && b.y + b.r > br.y && b.y - b.r < br.y + br.h) {
        br.hits--; beep(700);
        if (br.hits <= 0) {
          br.broken = true;
          score += br.isHard ? 30 : 10;
          if (br.isPower) powers.push({ x: br.x + br.w/2, y: br.y + br.h, type: br.powerType, icon: br.powerType === 'wide' ? '🔵' : br.powerType === 'multi' ? '🔴' : br.powerType === 'slow' ? '🟢' : '⭐' });
          if (score > best) { best = score; localStorage.setItem('brick_best', best); }
        } else score += 5;
        // Bounce - simple: reverse Y, if side hit reverse X
        const overlapTop = (b.y + b.r) - br.y;
        const overlapBottom = (br.y + br.h) - (b.y - b.r);
        const overlapLeft = (b.x + b.r) - br.x;
        const overlapRight = (br.x + br.w) - (b.x - b.r);
        const min = Math.min(overlapTop, overlapBottom, overlapLeft, overlapRight);
        if (min === overlapLeft || min === overlapRight) b.dx = -b.dx;
        else b.dy = -b.dy;
        updateUI();
      }
    });

    // Ball lost
    if (b.y - b.r > H) {
      balls.splice(bi, 1);
      if (balls.length === 0) loseLife();
    }
  });

  // Level complete?
  if (bricks.length && bricks.every(b => b.broken)) nextLevel();
}

function loseLife() {
  lives--; beep(200, 200);
  updateUI();
  if (lives <= 0) return gameOver();
  showToast(`Life lost! ${lives} left ❤️`);
  resetBall();
  document.getElementById('tapHint').classList.remove('hidden');
}

function nextLevel() {
  level++; score += 100;
  showToast(`Level ${level} Complete! +100 Bonus 🎉`);
  beep(900, 150);
  createBricks(); resetBall();
  document.getElementById('statusBadge').textContent = `Level ${level} 🎯`;
  updateUI();
}

function loop() {
  if (isPaused) { animationId = requestAnimationFrame(loop); return; }
  update(); draw();
  animationId = requestAnimationFrame(loop);
}

function startGame() {
  score = 0; lives = 3; level = 1; activePower = 'None';
  paddle.w = DIFFS[difficulty].paddleW;
  paddle.x = W/2 - paddle.w/2;
  createBricks(); resetBall();
  isPlaying = true; isPaused = false;
  cancelAnimationFrame(animationId);
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('overlayScore').classList.add('hidden');
  document.getElementById('tapHint').classList.remove('hidden');
  document.getElementById('statusBadge').textContent = 'Playing 🟢';
  document.getElementById('statusBadge').className = 'badge';
  updateUI(); draw();
  animationId = requestAnimationFrame(loop);
  showToast('Game Started! Break all bricks 🧱');
}

function gameOver() {
  cancelAnimationFrame(animationId);
  isPlaying = false;
  topScores.push(score); topScores.sort((a,b)=>b-a); topScores = topScores.slice(0,5);
  localStorage.setItem('brick_top', JSON.stringify(topScores));
  localStorage.setItem('brick_best', best);
  updateUI();
  const overlay = document.getElementById('overlay');
  overlay.classList.remove('hidden');
  document.getElementById('overlayTitle').textContent = 'Game Over! 💀';
  document.getElementById('overlayText').textContent = 'No lives left. Try again?';
  document.getElementById('overlayScore').classList.remove('hidden');
  document.getElementById('finalScore').textContent = score;
  document.getElementById('finalBest').textContent = best;
  document.getElementById('finalLevel').textContent = level;
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
  keys[k] = true;
  if (k === ' ') { e.preventDefault(); if (!isPlaying) startGame(); else if (ballStuck) launchBall(); else togglePause(); }
  if (k === 'enter') startGame();
  if (k === 'p') togglePause();
});
document.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (W / rect.width);
  paddle.x = Math.max(0, Math.min(W - paddle.w, x - paddle.w/2));
});
canvas.addEventListener('click', () => { if (!isPlaying) startGame(); else if (ballStuck) launchBall(); });
canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const x = (e.touches[0].clientX - rect.left) * (W / rect.width);
  paddle.x = Math.max(0, Math.min(W - paddle.w, x - paddle.w/2));
}, { passive: false });

document.getElementById('leftBtn').addEventListener('touchstart', () => keys['arrowleft'] = true);
document.getElementById('leftBtn').addEventListener('touchend', () => keys['arrowleft'] = false);
document.getElementById('rightBtn').addEventListener('touchstart', () => keys['arrowright'] = true);
document.getElementById('rightBtn').addEventListener('touchend', () => keys['arrowright'] = false);
document.getElementById('leftBtn').addEventListener('click', () => paddle.x = Math.max(0, paddle.x - 40));
document.getElementById('rightBtn').addEventListener('click', () => paddle.x = Math.min(W - paddle.w, paddle.x + 40));
document.getElementById('launchBtn').addEventListener('click', () => { if (!isPlaying) startGame(); else launchBall(); });

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('overlayBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', togglePause);
document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm('Reset best score?')) return;
  best = 0; topScores = []; localStorage.removeItem('brick_best'); localStorage.removeItem('brick_top');
  score = 0; updateUI(); showToast('Reset done 🔄');
});
document.querySelectorAll('.diff').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.diff').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  difficulty = b.dataset.diff;
  paddle.w = DIFFS[difficulty].paddleW;
  showToast('Difficulty: ' + b.textContent);
  if (isPlaying) { createBricks(); resetBall(); updateUI(); }
}));
document.getElementById('soundBtn').addEventListener('click', function() {
  soundOn = !soundOn; this.textContent = soundOn ? '🔊 Sound: ON' : '🔇 Sound: OFF';
});
document.getElementById('themeBtn').addEventListener('click', function() {
  const light = document.body.classList.toggle('light');
  this.textContent = light ? '🌙 Dark' : '☀️ Light';
});

createBricks(); resetBall();
updateUI(); draw();