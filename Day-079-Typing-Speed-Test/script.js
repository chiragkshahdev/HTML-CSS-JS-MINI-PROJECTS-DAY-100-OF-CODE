// --- WORD BANKS ---
const WORDS_EASY = ["the","and","you","that","was","for","are","with","his","they","this","have","from","or","one","had","by","word","but","not","what","all","were","we","when","your","can","said","there","use","an","each","which","she","do","how","their","will","other","about","out","many","then","them","these","so","some","her","would","make","like","him","into","time","has","look","two","more","write","go","see","number","no","way","could","people","my","than","first","water","been","call","who","oil","its","now","find","long","down","day","did","get","come","made","may","part"];
const WORDS_MEDIUM = [...WORDS_EASY, "computer","keyboard","internet","website","developer","project","design","market","business","learning","practice","speed","accuracy","challenge","creative","building","system","network","digital","future","success","journey","mountain","river","garden","library","science","history","music","travel","friend","family","morning","evening","window","picture","story","language","answer","question","beautiful","important","different","together","remember","understand"];
const WORDS_HARD = [...WORDS_MEDIUM, "pseudopod","quixotic","serendipity","mellifluous","ephemeral","ubiquitous","paradigm","juxtaposition","idiosyncrasy","conscientious","perspicacious","sesquipedalian","antidisestablishmentarianism","floccinaucinihilipilification","supercalifragilisticexpialidocious","programming","javascript","asynchronous","callback","algorithm","database","encryption","framework","middleware","repository","containerization","virtualization","authentication","authorization","kubernetes","microservices"];
const SENTENCES = [
  "The quick brown fox jumps over the lazy dog near the river bank.",
  "Practice makes a man perfect and typing daily improves your speed a lot.",
  "I am building amazing websites with HTML CSS and JavaScript every single day.",
  "Success comes to those who work hard and never give up on their dreams.",
  "Virar is a beautiful place near Mumbai with beaches and fast local trains.",
  "Learning to code is like learning a new language that opens many doors.",
  "The sun rises in the east and sets in the west every single day.",
  "My goal is to become a full stack developer and build my own startup one day."
];
const CODE_SNIPPETS = [
  "const user = { name: 'You', age: 22, city: 'Virar' }; console.log(user.name);",
  "function add(a, b) { return a + b; } const sum = add(5, 10);",
  "for (let i = 0; i < 10; i++) { console.log('Day ' + i); }",
  "if (score > 100) { console.log('You win!'); } else { console.log('Try again'); }",
  "const items = ['html', 'css', 'js']; items.forEach(item => console.log(item));"
];

let targetText = "";
let typed = []; // array of chars typed
let currentIndex = 0;
let startTime = null;
let timerInterval = null;
let timeLimit = 15;
let timeLeft = 15;
let isStarted = false;
let isFinished = false;
let correctCount = 0, wrongCount = 0;
let difficulty = 'easy';
let mode = 'words';
let soundOn = true;

function showToast(m) {
  const t = document.getElementById('toast');
  t.textContent = m; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}
function beep(freq = 500) {
  if (!soundOn) return;
  try {
    const a = new (window.AudioContext || window.webkitAudioContext)();
    const o = a.createOscillator(); o.frequency.value = freq; o.connect(a.destination); o.start();
    setTimeout(() => o.stop(), 40);
  } catch(e) {}
}
function getRank(wpm) {
  if (wpm >= 80) return '👑 Typing Master';
  if (wpm >= 60) return '🥇 Pro Typist';
  if (wpm >= 40) return '🥈 Good Typist';
  if (wpm >= 25) return '🥉 Average';
  return '🐣 Beginner - Keep Practicing';
}
function getHistory() { return JSON.parse(localStorage.getItem('typing_history')) || []; }
function saveHistory(entry) {
  const h = getHistory(); h.unshift(entry); if (h.length > 10) h.pop();
  localStorage.setItem('typing_history', JSON.stringify(h));
}

// --- GENERATE TEXT ---
function generateText() {
  if (mode === 'sentence') {
    // Pick 2-3 random sentences
    const shuffled = [...SENTENCES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3).join(' ');
  }
  if (mode === 'code') {
    const shuffled = [...CODE_SNIPPETS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2).join(' ');
  }
  // Words mode
  const bank = difficulty === 'easy' ? WORDS_EASY : difficulty === 'medium' ? WORDS_MEDIUM : WORDS_HARD;
  const count = difficulty === 'hard' ? 60 : 50;
  const words = [];
  for (let i = 0; i < count; i++) words.push(bank[Math.floor(Math.random() * bank.length)]);
  return words.join(' ');
}

function renderText() {
  const display = document.getElementById('textDisplay');
  display.innerHTML = targetText.split('').map((ch, i) => {
    let cls = '';
    if (i < typed.length) cls = typed[i] === ch ? 'correct' : 'wrong';
    else if (i === currentIndex) cls = 'current';
    // Extra typed chars beyond target
    return `<span class="${cls}">${ch === ' ' ? '&nbsp;' : ch}</span>`;
  }).join('') + (typed.length > targetText.length ? typed.slice(targetText.length).map(c => `<span class="extra">${c}</span>`).join('') : '');
  // Next key
  document.getElementById('nextKey').textContent = targetText[currentIndex] === ' ' ? 'SPACE' : (targetText[currentIndex] || '-');
  // Progress
  const progress = Math.min(100, Math.round((currentIndex / targetText.length) * 100));
  document.getElementById('liveProgress').textContent = progress + '%';
  document.getElementById('progressFill').style.width = progress + '%';
}

function updateLiveStats() {
  if (!startTime) { document.getElementById('liveWpm').textContent = 0; return; }
  const elapsedMin = (Date.now() - startTime) / 60000;
  const wpm = elapsedMin > 0 ? Math.round((correctCount / 5) / elapsedMin) : 0;
  const total = correctCount + wrongCount;
  const acc = total > 0 ? Math.round((correctCount / total) * 100) : 100;
  document.getElementById('liveWpm').textContent = wpm;
  document.getElementById('liveAcc').textContent = acc + '%';
  document.getElementById('liveTime').textContent = timeLeft;
}

function startTest() {
  targetText = generateText();
  typed = []; currentIndex = 0; correctCount = 0; wrongCount = 0;
  startTime = null; isStarted = false; isFinished = false;
  timeLeft = timeLimit;
  clearInterval(timerInterval);
  document.getElementById('results').classList.add('hidden');
  document.getElementById('liveTime').textContent = timeLeft;
  document.getElementById('liveWpm').textContent = 0;
  document.getElementById('liveAcc').textContent = '100%';
  document.getElementById('liveProgress').textContent = '0%';
  document.getElementById('progressFill').style.width = '0%';
  renderText();
  focusInput();
}

function startTimer() {
  if (isStarted) return;
  isStarted = true;
  startTime = Date.now();
  showToast('Test Started! Type fast ⌨️');
  timerInterval = setInterval(() => {
    timeLeft--;
    updateLiveStats();
    if (timeLeft <= 0) finishTest();
  }, 1000);
}

function finishTest() {
  clearInterval(timerInterval);
  isFinished = true;
  const elapsedMin = (Date.now() - startTime) / 60000;
  const wpm = Math.max(0, Math.round((correctCount / 5) / elapsedMin));
  const total = correctCount + wrongCount;
  const acc = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  // Save
  const entry = { wpm, acc, date: new Date().toLocaleDateString('en-IN'), time: timeLimit + 's' };
  saveHistory(entry);
  // Best
  const bestWpm = parseInt(localStorage.getItem('typing_best_wpm') || 0);
  if (wpm > bestWpm) localStorage.setItem('typing_best_wpm', wpm);
  const bestAcc = parseInt(localStorage.getItem('typing_best_acc') || 0);
  if (acc > bestAcc) localStorage.setItem('typing_best_acc', acc);
  beep(900);
  // Show results
  document.getElementById('finalWpm').textContent = wpm;
  document.getElementById('finalAcc').textContent = acc + '%';
  document.getElementById('finalCorrect').textContent = correctCount;
  document.getElementById('finalWrong').textContent = wrongCount;
  document.getElementById('finalRank').textContent = getRank(wpm);
  document.getElementById('resultMsg').textContent = wpm >= 40 ? '🔥 Amazing! You are faster than 80% people!' : wpm >= 25 ? '👍 Good! Daily practice se aur fast hoge.' : '💪 Keep practicing! Har din 10 min type karo.';
  document.getElementById('results').classList.remove('hidden');
  updateStatsPanel();
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

function updateStatsPanel() {
  const history = getHistory();
  const bestWpm = localStorage.getItem('typing_best_wpm') || 0;
  const bestAcc = localStorage.getItem('typing_best_acc') || 0;
  const avg = history.length ? Math.round(history.reduce((s, h) => s + h.wpm, 0) / history.length) : 0;
  document.getElementById('bestWpm').textContent = bestWpm;
  document.getElementById('bestAcc').textContent = bestAcc + '%';
  document.getElementById('totalTests').textContent = history.length;
  document.getElementById('avgWpm').textContent = avg;
  document.getElementById('historyList').innerHTML = history.length
    ? history.slice(0, 5).map(h => `<div class="history-item"><span>${h.date} • ${h.time}</span><b>${h.wpm} WPM • ${h.acc}%</b></div>`).join('')
    : '<p style="color:#999;font-size:13px">No tests yet</p>';
}

function focusInput() {
  document.getElementById('hiddenInput').focus();
  document.getElementById('textDisplay').classList.add('focused');
}

// --- TYPING LOGIC ---
const hiddenInput = document.getElementById('hiddenInput');
hiddenInput.addEventListener('input', (e) => {
  if (isFinished) { hiddenInput.value = ''; return; }
  const val = hiddenInput.value;
  // We handle char by char via keydown, this is just to clear
  hiddenInput.value = '';
});
document.addEventListener('keydown', (e) => {
  // Only if input focused or textDisplay clicked
  const isFocused = document.activeElement === hiddenInput;
  if (!isFocused && e.key.length !== 1 && e.key !== 'Backspace') return;
  if (!isFocused) return;
  if (isFinished) return;

  if (e.key === 'Backspace') {
    e.preventDefault();
    if (currentIndex > 0) {
      currentIndex--;
      const last = typed.pop();
      if (last === targetText[currentIndex]) correctCount--;
      else wrongCount--;
      renderText(); updateLiveStats();
    }
    return;
  }
  if (e.key.length !== 1) return; // Ignore Shift, Ctrl etc
  e.preventDefault();
  if (!isStarted) startTimer();

  const expected = targetText[currentIndex];
  if (currentIndex >= targetText.length) {
    // Extra chars - count as wrong
    typed.push(e.key); wrongCount++;
  } else {
    typed.push(e.key);
    if (e.key === expected) { correctCount++; beep(400); }
    else { wrongCount++; beep(200); }
    currentIndex++;
  }
  renderText(); updateLiveStats();
  // Auto finish if completed all text before time
  if (currentIndex >= targetText.length) {
    // Give bonus: finish early
    setTimeout(() => { if (!isFinished) finishTest(); }, 300);
  }
});

document.getElementById('textDisplay').addEventListener('click', focusInput);
document.getElementById('focusBtn').addEventListener('click', focusInput);

// Settings
document.querySelectorAll('.time-opt').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.time-opt').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  timeLimit = parseInt(b.dataset.time);
  startTest();
  showToast(`Time: ${timeLimit}s`);
}));
document.querySelectorAll('.diff').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.diff').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  difficulty = b.dataset.diff;
  startTest();
  showToast('Difficulty: ' + b.textContent);
}));
document.querySelectorAll('.mode').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.mode').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  mode = b.dataset.mode;
  startTest();
  showToast('Mode: ' + b.textContent);
}));

document.getElementById('restartBtn').addEventListener('click', startTest);
document.getElementById('retryBtn').addEventListener('click', startTest);
document.getElementById('shareBtn').addEventListener('click', () => {
  const wpm = document.getElementById('finalWpm').textContent;
  const acc = document.getElementById('finalAcc').textContent;
  const text = `⌨️ My Typing Speed: ${wpm} WPM | Accuracy: ${acc} | Try it!`;
  navigator.clipboard?.writeText(text).then(() => showToast('Copied! Share karo 📤'));
  alert(text);
});
document.getElementById('caretCheck').addEventListener('change', (e) => {
  const display = document.getElementById('textDisplay');
  if (!e.target.checked) display.querySelectorAll('.current').forEach(s => s.classList.remove('current'));
  else renderText();
});
document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm('Reset all stats?')) return;
  localStorage.removeItem('typing_history'); localStorage.removeItem('typing_best_wpm'); localStorage.removeItem('typing_best_acc');
  updateStatsPanel(); showToast('Stats reset 🔄');
});
document.getElementById('soundBtn').addEventListener('click', function() {
  soundOn = !soundOn; this.textContent = soundOn ? '🔊 Sound: ON' : '🔇 Sound: OFF';
});
document.getElementById('themeBtn').addEventListener('click', function() {
  const dark = document.body.classList.toggle('dark');
  this.textContent = dark ? '☀️ Light' : '🌙 Dark';
});

startTest();
updateStatsPanel();