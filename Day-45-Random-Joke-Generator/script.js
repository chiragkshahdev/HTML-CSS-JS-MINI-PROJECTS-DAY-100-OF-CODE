const setupEl = document.getElementById('setup');
const deliveryEl = document.getElementById('delivery');
const tagEl = document.getElementById('category-tag');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const speakBtn = document.getElementById('speakBtn');
const catBtns = document.querySelectorAll('.cat-btn');
const loader = document.querySelector('.loader');

let currentCategory = 'Any';
let currentJoke = '';

catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.cat;
  });
});

async function getJoke() {
  loader.classList.remove('hidden');
  setupEl.style.opacity = '0.3';
  deliveryEl.style.opacity = '0.3';
  
  try {
    const url = `https://v2.jokeapi.dev/joke/${currentCategory}?blacklistFlags=nsfw,racist,sexist&type=twopart`;
    const res = await fetch(url);
    const data = await res.json();
    
    if(data.error) throw new Error('No joke');
    
    if(data.type === 'single') {
      setupEl.textContent = data.joke;
      deliveryEl.textContent = '';
      currentJoke = data.joke;
    } else {
      setupEl.textContent = data.setup;
      deliveryEl.textContent = data.delivery;
      currentJoke = `${data.setup} - ${data.delivery}`;
    }
    tagEl.textContent = data.category;
    
  } catch(e) {
    // Fallback jokes if API fails
    const fallback = [
      { s: "Why don't scientists trust atoms?", d: "Because they make up everything!" },
      { s: "I told my wife she was drawing her eyebrows too high.", d: "She looked surprised." },
      { s: "Why did the programmer quit his job?", d: "Because he didn't get arrays." }
    ];
    const f = fallback[Math.floor(Math.random()*fallback.length)];
    setupEl.textContent = f.s;
    deliveryEl.textContent = f.d;
    currentJoke = `${f.s} ${f.d}`;
  } finally {
    loader.classList.add('hidden');
    setupEl.style.opacity = '1';
    deliveryEl.style.opacity = '1';
  }
}

generateBtn.addEventListener('click', getJoke);

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(currentJoke);
  copyBtn.textContent = '✅ Copied!';
  setTimeout(()=> copyBtn.textContent = '📋 Copy', 1500);
});

speakBtn.addEventListener('click', () => {
  const utter = new SpeechSynthesisUtterance(currentJoke);
  speechSynthesis.speak(utter);
});

// Auto load first joke
getJoke();