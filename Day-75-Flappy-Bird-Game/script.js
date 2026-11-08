const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const W = canvas.width, H = canvas.height;
const GROUND_H = 70;

let bird = { x: 80, y: 240, vy: 0, size: 22 };
let pipes = [];
let score = 0;
let best = parseInt(localStorage.getItem('flappy_best')) || 0;
let topScores = JSON.parse(localStorage.getItem('flappy_top')) || [];
let gamesPlayed = parseInt(localStorage.getItem('flappy_games')) || 0;
let isPlaying = false, isPaused = false, isGameOver = false;
let frame = 0, animationId = null;
let birdEmoji = '🐤';
let difficulty = 'easy';
let soundOn = true;
let isNight = false;

// Difficulty settings
const DIFFS = {
  easy: { gravity: 0.45, flap: -8, pipeSpeed: 2, gap: 160, pipeInterval: 110 },
  medium: { gravity: 0.55, flap: -8.5, pipeSpeed: 2.6, gap: 140, pipeInterval: 95 },
  hard: { gravity: 0.65, flap: -9, pipeSpeed: 3.2, gap: 120, pipeInterval: 80 }
};

function getSettings() { return DIFFS[difficulty]; }
function showToast(m) {
  const t = document.getElementById('toast');
  t.textContent = m; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}
function beep(freq = 500, dur = 80) {
  if (!soundOn) return;
  try {
    const audio = new (window.AudioContext || window.webkitAudioContext)();
    const o = audio.createOscillator(); o.frequency.value = freq; o.connect(audio.destination); o.start();
    setTimeout(() => o.stop(), dur);
  } catch(e) {}
}
function getMedal(s) {
  if (s >= 40) return '🏆 Gold';
  if (s >= 30) return '🥈 Silver';
  if (s >= 20) return '🥉 Bronze';
  if (s >= 10) return '⭐ Star';
  return '-';
}
function updateUI() {
  document.getElementById('score').textContent = score;
  document.getElementById('scoreTop').textContent = score;
  document.getElementById('best').textContent = best;
  document.getElementById('bestTop').textContent = best;
  document.getElementById('medal').textContent = getMedal(score);
  document.getElementById('games').textContent = gamesPlayed;
  document.getElementById('topList').innerHTML = topScores.length
    ? topScores.slice(0,5).map((s,i)=>`<li>${s} pts ${i===0?'👑':''}</li>`).join('')
    : '<li style="list-style:none">No scores yet</li>';
}

// --- DRAW ---
function drawBackground() {
  // Sky
  ctx.fillStyle = isNight ? '#0b1026' : '#70c5ce';
  ctx.fillRect(0, 0, W, H);
  // Stars at night
  if (isNight) {
    ctx.fillStyle = '#fff';
    for (let i=0;i<30;i++) ctx.fillRect((i*47+frame)%W, (i*31)%200, 2, 2);
    ctx.font = '30px Arial'; ctx.fillText('🌙', W-50, 40);
  } else {
    ctx.font = '28px Arial'; ctx.fillText('☁️', (W - frame % (W+60)) , 70); ctx.fillText('☁️', (W/2 - frame % (W+60) + 100) % W, 120);
    ctx.font = '26px Arial'; ctx.fillText('☀️', W-55, 42);
  }
  // Clouds hills
  ctx.fillStyle = isNight ? '#1e293b' : '#9ee37d';
  ctx.fillRect(0, H-GROUND_H-30, W, 30);
}

function drawPipes() {
  pipes.forEach(p => {
    const isGolden = p.golden;
    ctx.fillStyle = isGolden ? '#facc15' : '#22c55e';
    ctx.strokeStyle = '#14532d'; ctx.lineWidth = 2;
    // Top pipe
    ctx.fillRect(p.x, 0, 60, p.topH);
    ctx.strokeRect(p.x, 0, 60, p.topH);
    ctx.fillRect(p.x-4, p.topH-22, 68, 22);
    // Bottom pipe
    const bottomY = p.topH + getSettings().gap;
    ctx.fillRect(p.x, bottomY, 60, H - bottomY - GROUND_H);
    ctx.strokeRect(p.x, bottomY, 60, H - bottomY - GROUND_H);
    ctx.fillRect(p.x-4, bottomY, 68, 22);
    if (isGolden) { ctx.font = '20px Arial'; ctx.fillText('⭐', p.x+18, p.topH + getSettings().gap/2 + 8); }
  });
}

function drawGround() {
  ctx.fillStyle = '#ded895'; ctx.fillRect(0, H-GROUND_H, W, GROUND_H);
  ctx.fillStyle = '#9ee37d'; ctx.fillRect(0, H-GROUND_H, W, 12);
  // Moving stripes
  ctx.fillStyle = '#c9b458';
  for (let x = -((frame*2) % 30); x < W; x += 30) ctx.fillRect(x, H-GROUND_H+22, 15, 6);
}

function drawBird() {
  ctx.save();
  ctx.translate(bird.x, bird.y);
  const rot = Math.max(-0.4, Math.min(0.6, bird.vy * 0.05));
  ctx.rotate(rot);
  ctx.font = '44px Arial';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(birdEmoji, 0, 0);
  ctx.restore();
}

function drawScoreBig() {
  if (!isPlaying) return;
  ctx.fillStyle = '#fff'; ctx.strokeStyle = '#111'; ctx.lineWidth = 4;
  ctx.font = 'bold 48px Arial'; ctx.textAlign = 'center';
  ctx.strokeText(score, W/2, 70); ctx.fillText(score, W/2, 70);
}

function drawAll() {
  drawBackground();
  drawPipes();
  drawGround();
  drawBird();
  drawScoreBig();
}

// --- GAME LOOP ---
function loop() {
  if (isPaused) { animationId = requestAnimationFrame(loop); return; }
  frame++;
  const s = getSettings();

  // Physics
  bird.vy += s.gravity;
  bird.y += bird.vy;

  // Pipes spawn
  if (frame % s.pipeInterval === 0) {
    const topH = 60 + Math.random() * (H - GROUND_H - s.gap - 120);
    pipes.push({ x: W, topH, scored: false, golden: Math.random() < 0.12 });
  }

  // Move pipes
  pipes.forEach(p => p.x -= s.pipeSpeed);
  pipes = pipes.filter(p => p.x > -70);

  // Score
  pipes.forEach(p => {
    if (!p.scored && p.x + 60 < bird.x) {
      p.scored = true;
      score += p.golden ? 5 : 1;
      beep(p.golden ? 900 : 700);
      if (p.golden) showToast('⭐ Golden Pipe! +5');
      if (score > best) { best = score; localStorage.setItem('flappy_best', best); }
      updateUI();
    }
  });

  // Collision - Ground / Ceiling
  if (bird.y + bird.size > H - GROUND_H || bird.y < 0) return gameOver();

  // Collision - Pipes
  for (const p of pipes) {
    const inX = bird.x + bird.size/2 > p.x && bird.x - bird.size/2 < p.x + 60;
    const inTop = bird.y - bird.size/2 < p.topH;
    const inBottom = bird.y + bird.size/2 > p.topH + s.gap;
    if (inX && (inTop || inBottom)) return gameOver();
  }

  drawAll();
  animationId = requestAnimationFrame(loop);
}

function flap() {
  if (!isPlaying || isGameOver) return;
  if (isPaused) return;
  bird.vy = getSettings().flap;
  beep(400, 50);
  // Show tap hint hide
  document.getElementById('tapHint').classList.add('hidden');
}

function startGame() {
  bird = { x: 80, y: 240, vy: 0, size: 22 };
  pipes = []; score = 0; frame = 0;
  isPlaying = true; isPaused = false; isGameOver = false;
  gamesPlayed++; localStorage.setItem('flappy_games', gamesPlayed);
  cancelAnimationFrame(animationId);
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('tapHint').classList.remove('hidden');
  document.getElementById('statusBadge').textContent = 'Playing 🟢';
  document.getElementById('statusBadge').className = 'badge';
  document.getElementById('overlayScore').classList.add('hidden');
  updateUI();
  drawAll();
  animationId = requestAnimationFrame(loop);
  showToast('Game Started! Flap! 🐤');
}

function gameOver() {
  cancelAnimationFrame(animationId);
  isPlaying = false; isGameOver = true;
  beep(180, 250);
  topScores.push(score); topScores.sort((a,b)=>b-a); topScores = topScores.slice(0,5);
  localStorage.setItem('flappy_top', JSON.stringify(topScores));
  localStorage.setItem('flappy_best', best);
  updateUI();
  const overlay = document.getElementById('overlay');
  overlay.classList.remove('hidden');
  document.getElementById('overlayBird').textContent = '💥';
  document.getElementById('overlayTitle').textContent = 'Game Over!';
  document.getElementById('overlayText').textContent = 'Bird crashed! Try again?';
  document.getElementById('overlayScore').classList.remove('hidden');
  document.getElementById('finalScore').textContent = score;
  document.getElementById('finalBest').textContent = best;
  document.getElementById('finalMedal').textContent = getMedal(score);
  document.getElementById('overlayBtn').textContent = '🔄 Play Again';
  document.getElementById('statusBadge').textContent = 'Game Over';
  document.getElementById('statusBadge').className = 'badge over';
  document.getElementById('tapHint').classList.add('hidden');
  if (score >= 10) showToast(`Nice! ${score} pts - Medal: ${getMedal(score)}`);
  else showToast(`Game Over! Score: ${score}`);
}

function togglePause() {
  if (!isPlaying && !isGameOver) return;
  if (isGameOver) return;
  isPaused = !isPaused;
  document.getElementById('statusBadge').textContent = isPaused ? 'Paused ⏸️' : 'Playing 🟢';
  document.getElementById('statusBadge').className = isPaused ? 'badge paused' : 'badge';
  document.getElementById('pauseBtn').textContent = isPaused ? '▶️ Resume' : '⏸️ Pause';
  showToast(isPaused ? 'Paused ⏸️' : 'Resumed ▶️');
}

// --- CONTROLS ---
document.addEventListener('keydown', e => {
  if (e.code === 'Space') { e.preventDefault(); if (!isPlaying) startGame(); else flap(); }
  else if (e.key === 'Enter') { startGame(); }
  else if (e.key.toLowerCase() === 'p') { togglePause(); }
});
canvas.addEventListener('click', () => { if (!isPlaying) startGame(); else flap(); });
canvas.addEventListener('touchstart', e => { e.preventDefault(); if (!isPlaying) startGame(); else flap(); }, { passive: false });
document.getElementById('flapBtn').addEventListener('click', () => { if (!isPlaying) startGame(); else flap(); });

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('overlayBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', togglePause);
document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm('Reset best score & history?')) return;
  best = 0; topScores = []; gamesPlayed = 0;
  localStorage.removeItem('flappy_best'); localStorage.removeItem('flappy_top'); localStorage.removeItem('flappy_games');
  score = 0; updateUI(); showToast('Reset done 🔄');
});

// Bird select
document.querySelectorAll('.bird').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.bird').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  birdEmoji = b.dataset.bird;
  document.getElementById('overlayBird').textContent = birdEmoji;
  if (!isPlaying) drawAll();
  showToast('Bird: ' + b.textContent);
}));

// Difficulty
document.querySelectorAll('.diff').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.diff').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  difficulty = b.dataset.diff;
  showToast('Difficulty: ' + b.textContent);
}));

// Sound / Theme
document.getElementById('soundBtn').addEventListener('click', function() {
  soundOn = !soundOn;
  this.textContent = soundOn ? '🔊 Sound: ON' : '🔇 Sound: OFF';
});
document.getElementById('themeBtn').addEventListener('click', function() {
  isNight = !isNight;
  this.textContent = isNight ? '☀️ Day' : '🌙 Night';
  if (!isPlaying) drawAll();
});

updateUI();
drawAll();