const COLORS = ['green', 'red', 'yellow', 'blue'];
const TONES = { green: 329.63, red: 261.63, yellow: 220, blue: 164.81 }; // E, C, A, E low
const EMOJI = { green: '🟢', red: '🔴', yellow: '🟡', blue: '🔵' };

let sequence = [];
let playerIndex = 0;
let level = 0;
let score = 0;
let best = parseInt(localStorage.getItem('simon_best')) || 0;
let topScores = JSON.parse(localStorage.getItem('simon_top')) || [];
let streak = 0;
let isPlaying = false;
let isShowing = false; // Simon showing sequence
let mode = 'normal'; // normal | strict
let speedMode = 'normal'; // slow | normal | fast
let soundOn = true;
let audioCtx = null;

const SPEEDS = { slow: 700, normal: 500, fast: 300 };

function showToast(m) {
  const t = document.getElementById('toast');
  t.textContent = m; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function playTone(color, duration = 350) {
  if (!soundOn) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.frequency.value = TONES[color];
    o.type = 'sine';
    g.gain.setValueAtTime(0.3, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration / 1000);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + duration / 1000);
  } catch(e) {}
}

function playWrongSound() {
  if (!soundOn) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator();
    o.frequency.value = 110; o.type = 'sawtooth';
    o.connect(audioCtx.destination); o.start();
    setTimeout(() => o.stop(), 400);
  } catch(e) {}
}

function updateUI() {
  document.getElementById('level').textContent = level;
  document.getElementById('levelTop').textContent = level;
  document.getElementById('score').textContent = score;
  document.getElementById('scoreTop').textContent = score;
  document.getElementById('best').textContent = best;
  document.getElementById('streak').textContent = streak;
  document.getElementById('centerScore').textContent = level === 0 ? '--' : level;
  document.getElementById('seqLen').textContent = sequence.length;
  document.getElementById('yourTurn').textContent = isPlaying && !isShowing ? `${playerIndex + 1} / ${sequence.length}` : '-';
  document.getElementById('topList').innerHTML = topScores.length
    ? topScores.slice(0,5).map((s,i)=>`<li>${s} pts ${i===0?'👑':''}</li>`).join('')
    : '<li style="list-style:none">No scores yet</li>';
  // Progress dots
  const dots = document.getElementById('progressDots');
  dots.innerHTML = sequence.map((_, i) => `<div class="dot ${i < playerIndex ? 'done' : i === playerIndex ? 'current' : ''}"></div>`).join('');
  // Sequence visual - hide during play, show ? 
  const visual = document.getElementById('sequenceVisual');
  if (!isPlaying) visual.textContent = 'Press Start to begin';
  else if (isShowing) visual.textContent = '👀 Watch Simon...';
  else visual.textContent = '✋ Your Turn! Repeat it';
}

function lightPad(color, duration = 350) {
  const pad = document.querySelector(`.pad[data-color="${color}"]`);
  pad.classList.add('lit');
  playTone(color, duration);
  setTimeout(() => pad.classList.remove('lit'), duration);
}

function setPadsEnabled(enabled) {
  document.querySelectorAll('.pad').forEach(p => p.disabled = !enabled);
}

async function showSequence() {
  isShowing = true;
  setPadsEnabled(false);
  document.getElementById('statusBadge').textContent = '👀 Watch Simon...';
  document.getElementById('statusBadge').className = 'badge playing';
  document.getElementById('centerLabel').textContent = 'WATCH';
  updateUI();
  await sleep(600);
  const speed = SPEEDS[speedMode];
  for (let i = 0; i < sequence.length; i++) {
    lightPad(sequence[i], speed);
    await sleep(speed + 150);
  }
  isShowing = false;
  setPadsEnabled(true);
  document.getElementById('statusBadge').textContent = '✋ Your Turn!';
  document.getElementById('statusBadge').className = 'badge your-turn';
  document.getElementById('centerLabel').textContent = 'YOUR TURN';
  updateUI();
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function nextLevel() {
  level++;
  streak++;
  score += level * 10; // Level 1 = 10, Level 5 = 50
  // Bonus for speed
  if (speedMode === 'fast') score += 5;
  if (score > best) { best = score; localStorage.setItem('simon_best', best); }
  const nextColor = COLORS[Math.floor(Math.random() * 4)];
  sequence.push(nextColor);
  playerIndex = 0;
  updateUI();
  showToast(`Level ${level}! Sequence length: ${sequence.length}`);
  setTimeout(() => showSequence(), 600);
}

function handlePad(color) {
  if (!isPlaying || isShowing) return;
  lightPad(color, 250);
  const expected = sequence[playerIndex];
  if (color === expected) {
    playerIndex++;
    updateUI();
    if (playerIndex === sequence.length) {
      // Level complete!
      setPadsEnabled(false);
      document.getElementById('centerLabel').textContent = 'CORRECT! 🎉';
      showToast(`Level ${level} Complete! +${level * 10} pts 🎉`);
      setTimeout(() => nextLevel(), 800);
    }
  } else {
    // Wrong!
    handleWrong(color);
  }
}

function handleWrong(color) {
  playWrongSound();
  const pad = document.querySelector(`.pad[data-color="${color}"]`);
  pad.classList.add('wrong');
  setTimeout(() => pad.classList.remove('wrong'), 400);
  setPadsEnabled(false);

  if (mode === 'strict') {
    // Strict: Game Over, restart from 0
    showToast('❌ Wrong! Strict Mode - Game Over');
    setTimeout(() => gameOver(), 600);
  } else {
    // Normal: Retry same sequence
    showToast('❌ Wrong! Try same sequence again');
    streak = 0;
    playerIndex = 0;
    setTimeout(() => {
      showSequence();
    }, 800);
  }
  updateUI();
}

function startGame() {
  sequence = []; playerIndex = 0; level = 0; score = 0; streak = 0;
  isPlaying = true;
  document.getElementById('statusBadge').textContent = 'Playing 🟢';
  showToast('Simon Says Started! Watch carefully 👀');
  // First level
  nextLevel();
}

function gameOver() {
  isPlaying = false;
  setPadsEnabled(false);
  topScores.push(score); topScores.sort((a,b)=>b-a); topScores = topScores.slice(0,5);
  localStorage.setItem('simon_top', JSON.stringify(topScores));
  localStorage.setItem('simon_best', best);
  document.getElementById('statusBadge').textContent = `Game Over - Level ${level} Reached`;
  document.getElementById('statusBadge').className = 'badge over';
  document.getElementById('centerLabel').textContent = 'GAME OVER';
  updateUI();
  setTimeout(() => {
    if (confirm(`Game Over! Score: ${score} | Level: ${level}\nBest: ${best}\n\nPlay Again?`)) startGame();
    else { document.getElementById('sequenceVisual').textContent = 'Press Start to play again'; }
  }, 400);
}

function replaySequence() {
  if (!isPlaying) return showToast('Start game first!');
  if (isShowing) return;
  showSequence();
}

// --- CONTROLS ---
document.querySelectorAll('.pad').forEach(pad => {
  pad.addEventListener('click', () => handlePad(pad.dataset.color));
});
document.addEventListener('keydown', e => {
  const map = { '1': 'green', '2': 'red', '3': 'yellow', '4': 'blue' };
  if (map[e.key]) handlePad(map[e.key]);
  if (e.key === 'Enter' && !isPlaying) startGame();
});

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('replayBtn').addEventListener('click', replaySequence);
document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm('Reset best score?')) return;
  best = 0; topScores = []; localStorage.removeItem('simon_best'); localStorage.removeItem('simon_top');
  score = 0; updateUI(); showToast('Reset done 🔄');
});

document.querySelectorAll('.mode').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.mode').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  mode = b.dataset.mode;
  document.getElementById('modeDesc').textContent = mode === 'strict'
    ? 'Strict: Galat par Game Over, start from Level 1'
    : 'Normal: Galat par same sequence retry';
  showToast('Mode: ' + b.textContent);
}));
document.querySelectorAll('.speed').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.speed').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  speedMode = b.dataset.speed;
  showToast('Speed: ' + b.textContent);
}));
document.getElementById('soundBtn').addEventListener('click', function() {
  soundOn = !soundOn; this.textContent = soundOn ? '🔊 Sound: ON' : '🔇 Sound: OFF';
});
document.getElementById('themeBtn').addEventListener('click', function() {
  const dark = document.body.classList.toggle('dark');
  this.textContent = dark ? '☀️ Light' : '🌙 Dark';
});

setPadsEnabled(false);
updateUI();