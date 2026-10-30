const textInput = document.getElementById('textInput');
const voiceSelect = document.getElementById('voiceSelect');
const rate = document.getElementById('rate');
const pitch = document.getElementById('pitch');
const volume = document.getElementById('volume');
const speakBtn = document.getElementById('speakBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const status = document.getElementById('status');
const btnText = document.getElementById('btnText');
const btnIcon = document.getElementById('btnIcon');

const rateValue = document.getElementById('rateValue');
const pitchValue = document.getElementById('pitchValue');
const volumeValue = document.getElementById('volumeValue');
const charCount = document.getElementById('charCount');

let voices = [];
let utterance = null;
let isPaused = false;

// Load Voices
function loadVoices() {
  voices = window.speechSynthesis.getVoices();
  voiceSelect.innerHTML = '';
  voices.forEach((voice, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang}) ${voice.default ? '— Default' : ''}`;
    voiceSelect.appendChild(option);
  });
}

window.speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

// Update display values
rate.addEventListener('input', () => rateValue.textContent = rate.value);
pitch.addEventListener('input', () => pitchValue.textContent = pitch.value);
volume.addEventListener('input', () => volumeValue.textContent = Math.round(volume.value * 100) + '%');

textInput.addEventListener('input', () => {
  charCount.textContent = textInput.value.length;
});

// Speak
speakBtn.addEventListener('click', () => {
  const text = textInput.value.trim();
  if (!text) {
    status.textContent = 'Please enter some text!';
    return;
  }

  if (window.speechSynthesis.speaking && !isPaused) {
    // If already speaking, stop and restart
    window.speechSynthesis.cancel();
  }

  if (isPaused) {
    window.speechSynthesis.resume();
    isPaused = false;
    btnText.textContent = 'Speaking...';
    btnIcon.textContent = '⏸';
    speakBtn.classList.add('speaking');
    status.textContent = 'Resumed...';
    return;
  }

  utterance = new SpeechSynthesisUtterance(text);
  const selectedVoice = voices[voiceSelect.value];
  if (selectedVoice) utterance.voice = selectedVoice;

  utterance.rate = parseFloat(rate.value);
  utterance.pitch = parseFloat(pitch.value);
  utterance.volume = parseFloat(volume.value);

  utterance.onstart = () => {
    btnText.textContent = 'Speaking...';
    btnIcon.textContent = '⏸';
    speakBtn.classList.add('speaking');
    status.textContent = `Speaking with ${selectedVoice ? selectedVoice.name : 'default voice'}...`;
  };

  utterance.onend = () => {
    btnText.textContent = 'Speak';
    btnIcon.textContent = '▶';
    speakBtn.classList.remove('speaking');
    status.textContent = 'Finished • Ready to speak again';
    isPaused = false;
  };

  utterance.onerror = (e) => {
    status.textContent = 'Error: ' + e.error;
    btnText.textContent = 'Speak';
    btnIcon.textContent = '▶';
    speakBtn.classList.remove('speaking');
  };

  window.speechSynthesis.speak(utterance);
});

// Pause
pauseBtn.addEventListener('click', () => {
  if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
    window.speechSynthesis.pause();
    isPaused = true;
    btnText.textContent = 'Resume';
    btnIcon.textContent = '▶';
    status.textContent = 'Paused';
  }
});

// Stop
stopBtn.addEventListener('click', () => {
  window.speechSynthesis.cancel();
  isPaused = false;
  btnText.textContent = 'Speak';
  btnIcon.textContent = '▶';
  speakBtn.classList.remove('speaking');
  status.textContent = 'Stopped • Ready to speak';
});

// Initial count
charCount.textContent = textInput.value.length;