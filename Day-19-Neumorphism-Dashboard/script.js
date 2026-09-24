const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const playBtn = document.querySelector('.play-btn');
const progress = document.querySelector('.progress');
let isPlaying = false;
let progressWidth = 42;

// Theme Toggle
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    themeToggle.classList.toggle('active');

    // Icon change
    if(body.classList.contains('dark')){
        themeToggle.innerHTML = "<i class='bx bx-sun'></i>";
    } else {
        themeToggle.innerHTML = "<i class='bx bx-moon'></i>";
    }
});

// Play/Pause Toggle
playBtn.addEventListener('click', () => {
    isPlaying =!isPlaying;
    playBtn.classList.toggle('active');

    if(isPlaying){
        playBtn.innerHTML = "<i class='bx bx-pause'></i>";
        // Fake progress animation
        window.progressInterval = setInterval(() => {
            progressWidth += 0.2;
            if(progressWidth > 100) progressWidth = 0;
            progress.style.width = progressWidth + "%";
        }, 200);
    } else {
        playBtn.innerHTML = "<i class='bx bx-play'></i>";
        clearInterval(window.progressInterval);
    }
});

// Press effect for all buttons
document.querySelectorAll('.neumo-btn').forEach(btn => {
    btn.addEventListener('mousedown', () => {
        btn.style.boxShadow = `inset 4px 4px 8px var(--shadow-dark), inset -4px -4px 8px var(--shadow-light)`;
    });
    btn.addEventListener('mouseup', () => {
        btn.style.boxShadow = `6px 6px 10px var(--shadow-dark), -6px -6px 10px var(--shadow-light)`;
    });
});