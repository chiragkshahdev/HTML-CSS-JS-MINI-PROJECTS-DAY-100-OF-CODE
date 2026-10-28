const micBtn = document.getElementById('micBtn');
const output = document.getElementById('output');
const interimEl = document.getElementById('interim');
const statusEl = document.getElementById('status');
const languageEl = document.getElementById('language');
const waves = document.getElementById('waves');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');
const historyList = document.getElementById('historyList');

let recognition;
let isListening = false;
let finalTranscript = '';
let history = JSON.parse(localStorage.getItem('stt-history')) || [];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if(!SpeechRecognition) {
  alert('Your browser does not support Speech Recognition. Use Chrome.');
} else {
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
}

function updateCounts() {
  const text = output.value.trim();
  const words = text ? text.split(/\s+/).length : 0;
  wordCount.textContent = `${words} words`;
  charCount.textContent = `${text.length} chars`;
}

function saveHistory(text) {
  if(!text.trim()) return;
  const item = { text: text.slice(0,60) + (text.length>60?'...':''), full: text, time: new Date().toLocaleTimeString() };
  history.unshift(item);
  if(history.length > 10) history.pop();
  localStorage.setItem('stt-history', JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = history.map((h,i) => `
    <div class="history-item">
      <span onclick="restoreHistory(${i})" style="cursor:pointer; flex:1;">${h.text}</span>
      <small>${h.time}</small>
    </div>
  `).join('');
}

window.restoreHistory = (i) => {
  output.value = history[i].full;
  updateCounts();
};

languageEl.addEventListener('change', () => {
  if(recognition) recognition.lang = languageEl.value;
});

micBtn.addEventListener('click', () => {
  if(isListening) {
    recognition.stop();
  } else {
    finalTranscript = output.value ? output.value + ' ' : '';
    recognition.lang = languageEl.value;
    recognition.start();
  }
});

if(recognition) {
  recognition.onstart = () => {
    isListening = true;
    micBtn.classList.add('listening');
    waves.classList.remove('hidden');
    statusEl.classList.add('listening');
    statusEl.innerHTML = '<span class="dot"></span> Listening...';
    document.querySelector('.hint').textContent = 'Listening... Tap to stop';
  };

  recognition.onend = () => {
    isListening = false;
    micBtn.classList.remove('listening');
    waves.classList.add('hidden');
    statusEl.classList.remove('listening');
    statusEl.innerHTML = '<span class="dot"></span> Idle';
    document.querySelector('.hint').textContent = 'Tap to start speaking';
    interimEl.textContent = '';
    if(finalTranscript.trim() !== output.value.trim()) {
      saveHistory(output.value);
    }
  };

  recognition.onresult = (e) => {
    let interim = '';
    for(let i=e.resultIndex; i<e.results.length; i++) {
      const transcript = e.results[i][0].transcript;
      if(e.results[i].isFinal) {
        finalTranscript += transcript + ' ';
      } else {
        interim += transcript;
      }
    }
    output.value = finalTranscript;
    interimEl.textContent = interim;
    updateCounts();
  };

  recognition.onerror = (e) => {
    console.error(e);
    statusEl.textContent = 'Error: ' + e.error;
  };
}

// Actions
document.getElementById('copyBtn').addEventListener('click', () => {
  navigator.clipboard.writeText(output.value);
  const btn = document.getElementById('copyBtn');
  btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
  setTimeout(()=> btn.innerHTML = '<i class="fas fa-copy"></i> Copy', 1500);
});

document.getElementById('clearBtn').addEventListener('click', () => {
  output.value = ''; finalTranscript = ''; interimEl.textContent = ''; updateCounts();
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const blob = new Blob([output.value], {type:'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `transcript-${Date.now()}.txt`; a.click();
});

document.getElementById('speakBtn').addEventListener('click', () => {
  const utter = new SpeechSynthesisUtterance(output.value);
  utter.lang = languageEl.value;
  speechSynthesis.speak(utter);
});

output.addEventListener('input', updateCounts);

renderHistory();
updateCounts();