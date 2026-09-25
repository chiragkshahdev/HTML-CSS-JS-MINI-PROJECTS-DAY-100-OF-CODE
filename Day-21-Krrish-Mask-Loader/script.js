// Day 21 - Krrish Mask Loader Logic

const loader = document.querySelector('.loader-wrapper');
const loadingText = document.querySelector('.loading-text');
const mask = document.querySelector('.krrish-mask');

// Fake loading progress 0 to 100%
let progress = 0;

const loadingInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5; // 5 to 20% random
    if (progress > 100) progress = 100;

    loadingText.textContent = `Loading... ${progress}%`;

    // Mask glow intensity badhao jaise progress badhe
    mask.style.filter = `brightness(${1 + progress / 100})`;

    if (progress === 100) {
        clearInterval(loadingInterval);
        loadingText.textContent = "Krrish is Ready! 🦸‍♂️";
        
        // 500ms baad loader hide aur content show
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transform = 'scale(1.5)';
            loader.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                loader.style.display = 'none';
                showMainContent();
            }, 800);
        }, 500);
    }
}, 200);

function showMainContent() {
    document.body.innerHTML = `
        <div style="color:white; text-align:center; margin-top:15%; font-family: Arial;">
            <h1 style="font-size:3rem; color:#00ffcc; text-shadow: 0 0 20px #00ffcc;">Krrish Loaded!</h1>
            <p style="margin-top:20px; opacity:0.7;">Day 21 Project Complete ✅</p>
            <button onclick="location.reload()" style="margin-top:30px; padding:12px 25px; background:#00ffcc; border:none; border-radius:25px; cursor:pointer; font-weight:bold;">Replay Loader</button>
        </div>
    `;
}

// Real website me isko aise use karna:
// window.addEventListener('load', () => { loader hide })
// ya API fetch complete hone pe loader hide