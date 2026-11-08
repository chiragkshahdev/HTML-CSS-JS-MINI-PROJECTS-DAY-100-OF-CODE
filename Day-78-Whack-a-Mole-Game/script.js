const board = document.getElementById('board');
const hammer = document.getElementById('hammer');

let score = 0;
let best = parseInt(localStorage.getItem('mole_best')) || 0;
let topScores = JSON.parse(localStorage.getItem('mole_top')) || [];
let timeLeft = 30;
let hits = 0, miss = 0, combo = 0;
let isPlaying = false, isPaused = false;
let gameTimer = null, moleTimer = null;
let difficulty = 'easy';
let soundOn = true;
let currentMoles = []; // active mole timers

const DIFFS = {
  easy: { duration: 30, spawn: 800, moleUp: 1100, speed: 1 },
  medium: { duration: 30, spawn: 600, moleUp: 850, speed: 1.2 },
  hard: { duration: 30, spawn: 450, moleUp: 650, speed: 1.4 }
};

function showToast(m) {
  const t = document.getElementById('toast');
  t.textContent = m; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}
function beep(freq = 500, dur = 70) {
  if (!soundOn) return;
  try {
    const a = new (window.AudioContext || window.webkitAudioContext)();
    const o = a.createOscillator(); o.frequency.value = freq; o.connect(a.destination); o.start();
    setTimeout(() => o.stop(), dur);
  } catch(e) {}
}
function getRank(s) {
  if (s >= 500) return '👑 Mole Master';
  if (s >= 300) return '🥇 Pro Whacker';
  if (s >= 150) return '🥈 Good Player';
  if (s >= 80) return '🥉 Beginner';
  return '🐣 Newbie';
}
function getAccuracy() {
  const total = hits + miss;
  return total === 0 ? 100 : Math.round((hits / total) * 100);
}

// --- BUILD BOARD ---
function buildBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement('div');
    hole.className = 'hole';
    hole.dataset.index = i;
    hole.innerHTML = `<div class="mole" id="mole-${i}"></div>`;
    hole.addEventListener('click', (e) => whackHole(i, e));
    board.appendChild(hole);
  }
}

function updateUI() {
  document.getElementById('score').textContent = score;
  document.getElementById('scoreTop').textContent = score;
  document.getElementById('best').textContent = best;
  document.getElementById('bestTop').textContent = best;
  document.getElementById('time').textContent = timeLeft;
  document.getElementById('timeTop').textContent = timeLeft + 's';
  document.getElementById('hits').textContent = hits;
  document.getElementById('hitsTop').textContent = hits;
  document.getElementById('combo').textContent = 'x' + combo;
  document.getElementById('comboFill').style.width = Math.min(combo * 10, 100) + '%';
  document.getElementById('accuracy').textContent = getAccuracy() + '%';
  document.getElementById('miss').textContent = miss;
  document.getElementById('timeFill').style.width = (timeLeft / DIFFS[difficulty].duration * 100) + '%';
  document.getElementById('topList').innerHTML = topScores.length
    ? topScores.slice(0,5).map((s,i)=>`<li>${s} pts ${i===0?'👑':''}</li>`).join('')
    : '<li style="list-style:none">No scores yet</li>';
}

function spawnMole() {
  if (!isPlaying || isPaused) return;
  // Pick random empty hole
  const emptyHoles = [];
  for (let i = 0; i < 9; i++) {
    const el = document.getElementById(`mole-${i}`);
    if (!el.classList.contains('up')) emptyHoles.push(i);
  }
  if (!emptyHoles.length) return;
  const idx = emptyHoles[Math.floor(Math.random() * emptyHoles.length)];
  const el = document.getElementById(`mole-${idx}`);

  // Type: 70% normal, 15% golden, 8% bomb, 7% heart
  const rand = Math.random();
  let type = 'normal', emoji = '🐹', points = 10;
  if (rand < 0.15) { type = 'golden'; emoji = '⭐🐹'; points = 50; }
  else if (rand < 0.23) { type = 'bomb'; emoji = '💣'; points = -20; }
  else if (rand < 0.30) { type = 'heart'; emoji = '❤️🐹'; points = 10; }

  el.textContent = emoji;
  el.dataset.type = type;
  el.dataset.points = points;
  el.className = 'mole up' + (type === 'golden' ? ' golden' : '');
  el.dataset.hit = 'false';

  const upTime = type === 'golden' ? 600 : DIFFS[difficulty].moleUp;
  setTimeout(() => {
    if (el.dataset.hit === 'false') {
      el.classList.remove('up');
      // Miss if it was normal/golden and not hit - combo reset
      if (type !== 'bomb' && isPlaying) { combo = 0; }
    }
  }, upTime);
}

function whackHole(idx, e) {
  if (!isPlaying || isPaused) return;
  const el = document.getElementById(`mole-${idx}`);
  const hole = document.querySelector(`.hole[data-index="${idx}"]`);

  // Hammer animation
  if (e && e.clientX) {
    hammer.style.display = 'block';
    hammer.style.left = e.clientX + 'px';
    hammer.style.top = e.clientY + 'px';
    hammer.classList.add('swing');
    setTimeout(() => hammer.classList.remove('swing'), 120);
  }

  if (!el.classList.contains('up') || el.dataset.hit === 'true') {
    // Clicked empty hole = Miss
    miss++; combo = 0; beep(200, 50);
    showPop(hole, 'Miss!');
    updateUI();
    return;
  }

  // Hit!
  el.dataset.hit = 'true';
  el.classList.add('hit');
  const type = el.dataset.type;
  const points = parseInt(el.dataset.points);

  if (type === 'bomb') {
    score = Math.max(0, score - 20);
    combo = 0; miss++;
    beep(150, 200);
    showPop(hole, '💥 -20!');
    showToast('💣 Bomb! -20 Points');
  } else if (type === 'golden') {
    score += 50; hits++; combo++;
    beep(900);
    showPop(hole, '⭐ +50!');
    showToast('⭐ Golden Mole! +50');
  } else if (type === 'heart') {
    score += 10; hits++; combo++;
    timeLeft = Math.min(timeLeft + 5, 60);
    beep(800);
    showPop(hole, '❤️ +5s!');
    showToast('❤️ +5 Seconds!');
  } else {
    // Normal - combo bonus
    combo++;
    let bonus = 10;
    if (combo >= 5) bonus = 20;
    if (combo >= 10) bonus = 30;
    score += bonus; hits++;
    beep(600);
    if (combo >= 3) showPop(hole, `🔥 +${bonus}!`);
    else showPop(hole, `+${bonus}`);
    if (combo === 5) showToast('🔥 Combo x5! Double Points!');
    if (combo === 10) showToast('🔥🔥 MEGA COMBO x10!');
  }

  if (score > best) { best = score; localStorage.setItem('mole_best', best); }
  setTimeout(() => { el.classList.remove('up', 'hit'); el.textContent = ''; }, 180);
  updateUI();
}

function showPop(hole, text) {
  const span = document.createElement('div');
  span.className = 'score-pop';
  span.textContent = text;
  hole.appendChild(span);
  setTimeout(() => span.remove(), 700);
}

function startGame() {
  score = 0; hits = 0; miss = 0; combo = 0;
  timeLeft = DIFFS[difficulty].duration;
  isPlaying = true; isPaused = false;
  clearInterval(gameTimer); clearInterval(moleTimer);
  buildBoard();
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('statusBadge').textContent = 'Playing 🟢';
  document.getElementById('statusBadge').className = 'badge';
  updateUI();

  // Spawn moles repeatedly
  moleTimer = setInterval(spawnMole, DIFFS[difficulty].spawn);
  // Countdown
  gameTimer = setInterval(() => {
    if (isPaused) return;
    timeLeft--;
    updateUI();
    if (timeLeft <= 5 && timeLeft > 0) beep(800, 80);
    if (timeLeft <= 0) endGame();
  }, 1000);
  showToast('Game Started! Whack Moles! 🐹');
}

function endGame() {
  clearInterval(gameTimer); clearInterval(moleTimer);
  isPlaying = false;
  beep(300, 200);
  topScores.push(score); topScores.sort((a,b)=>b-a); topScores = topScores.slice(0,5);
  localStorage.setItem('mole_top', JSON.stringify(topScores));
  localStorage.setItem('mole_best', best);
  updateUI();
  // Hide all moles
  document.querySelectorAll('.mole').forEach(m => m.classList.remove('up'));

  const overlay = document.getElementById('overlay');
  overlay.classList.remove('hidden');
  document.getElementById('overlayTitle').textContent = 'Time Up! ⏰';
  document.getElementById('overlayText').textContent = 'Great whacking!';
  document.getElementById('overlayScore').classList.remove('hidden');
  document.getElementById('finalScore').textContent = score;
  document.getElementById('finalBest').textContent = best;
  document.getElementById('finalHits').textContent = hits;
  document.getElementById('finalAcc').textContent = getAccuracy() + '%';
  document.getElementById('finalRank').textContent = getRank(score);
  document.getElementById('overlayBtn').textContent = '🔄 Play Again';
  document.getElementById('statusBadge').textContent = 'Game Over';
  document.getElementById('statusBadge').className = 'badge over';
  showToast(`Time Up! Score: ${score} - ${getRank(score)}`);
}

function togglePause() {
  if (!isPlaying) return;
  isPaused = !isPaused;
  document.getElementById('statusBadge').textContent = isPaused ? 'Paused ⏸️' : 'Playing 🟢';
  document.getElementById('statusBadge').className = isPaused ? 'badge paused' : 'badge';
  document.getElementById('pauseBtn').textContent = isPaused ? '▶️ Resume' : '⏸️ Pause';
  showToast(isPaused ? 'Paused ⏸️' : 'Resumed ▶️');
}

// Hammer follows mouse
document.addEventListener('mousemove', e => {
  if (window.innerWidth < 850) return;
  hammer.style.display = 'block';
  hammer.style.left = e.clientX + 'px';
  hammer.style.top = e.clientY + 'px';
});
document.addEventListener('mouseleave', () => hammer.style.display = 'none');

// Controls
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('overlayBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', togglePause);
document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm('Reset best score?')) return;
  best = 0; topScores = []; localStorage.removeItem('mole_best'); localStorage.removeItem('mole_top');
  score = 0; updateUI(); showToast('Reset done 🔄');
});
document.querySelectorAll('.diff').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.diff').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  difficulty = b.dataset.diff;
  showToast('Difficulty: ' + b.textContent);
}));
document.getElementById('soundBtn').addEventListener('click', function() {
  soundOn = !soundOn; this.textContent = soundOn ? '🔊 Sound: ON' : '🔇 Sound: OFF';
});
document.getElementById('themeBtn').addEventListener('click', function() {
  const dark = document.body.classList.toggle('dark');
  this.textContent = dark ? '☀️ Light' : '🌙 Dark';
});
document.addEventListener('keydown', e => {
  if (e.key === ' ') { e.preventDefault(); if (!isPlaying) startGame(); }
  if (e.key.toLowerCase() === 'p') togglePause();
});

buildBoard();
updateUI();