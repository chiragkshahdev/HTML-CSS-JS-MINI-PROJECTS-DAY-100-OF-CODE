// Tabs Logic
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// --- STOPWATCH ---
let swInterval, swMs = 0;
const swDisplay = document.getElementById('sw-display');

function updateStopwatch() {
    swMs += 10;
    let ms = Math.floor((swMs % 1000) / 10);
    let sec = Math.floor((swMs / 1000) % 60);
    let min = Math.floor((swMs / (1000 * 60)) % 60);
    let hr = Math.floor(swMs / (1000 * 60 * 60));
    swDisplay.textContent = 
        `${String(hr).padStart(2,'0')}:${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}:${String(ms).padStart(2,'0')}`;
}

document.getElementById('sw-start').onclick = () => {
    if (!swInterval) swInterval = setInterval(updateStopwatch, 10);
};
document.getElementById('sw-stop').onclick = () => {
    clearInterval(swInterval);
    swInterval = null;
};
document.getElementById('sw-reset').onclick = () => {
    clearInterval(swInterval);
    swInterval = null;
    swMs = 0;
    swDisplay.textContent = "00:00:00:00";
};

// --- TIMER ---
let tmInterval, tmTime = 0;
const tmDisplay = document.getElementById('tm-display');
const minInput = document.getElementById('min');
const secInput = document.getElementById('sec');

function updateTimerDisplay() {
    let m = Math.floor(tmTime / 60);
    let s = tmTime % 60;
    tmDisplay.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

document.getElementById('tm-start').onclick = () => {
    if (tmInterval) return;
    if (tmTime === 0) {
        let m = parseInt(minInput.value) || 0;
        let s = parseInt(secInput.value) || 0;
        tmTime = m * 60 + s;
    }
    if (tmTime <= 0) return;

    tmInterval = setInterval(() => {
        tmTime--;
        updateTimerDisplay();
        if (tmTime <= 0) {
            clearInterval(tmInterval);
            tmInterval = null;
            alert("Time's Up!");
        }
    }, 1000);
};

document.getElementById('tm-stop').onclick = () => {
    clearInterval(tmInterval);
    tmInterval = null;
};

document.getElementById('tm-reset').onclick = () => {
    clearInterval(tmInterval);
    tmInterval = null;
    tmTime = 0;
    minInput.value = '';
    secInput.value = '';
    tmDisplay.textContent = "00:00";
};