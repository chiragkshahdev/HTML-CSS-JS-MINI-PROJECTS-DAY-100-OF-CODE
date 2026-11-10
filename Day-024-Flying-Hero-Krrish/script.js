const krrish = document.getElementById('krrish');
const altDisplay = document.getElementById('alt');

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
let speed = 12;

document.addEventListener('keydown', (e) => {
    krrish.classList.add('flying');
    
    if (e.code === 'KeyW' || e.code === 'ArrowUp') y -= speed;
    if (e.code === 'KeyS' || e.code === 'ArrowDown') y += speed;
    if (e.code === 'KeyA' || e.code === 'ArrowLeft') x -= speed;
    if (e.code === 'KeyD' || e.code === 'ArrowRight') x += speed;
    
    if (e.code === 'Space') {
        krrish.classList.add('super-speed');
        speed = 30;
        setTimeout(() => {
            speed = 12;
            krrish.classList.remove('super-speed');
        }, 300);
    }

    // Boundary
    x = Math.max(50, Math.min(window.innerWidth - 50, x));
    y = Math.max(50, Math.min(window.innerHeight - 50, y));

    krrish.style.left = x + 'px';
    krrish.style.top = y + 'px';
    
    let altitude = Math.floor(window.innerHeight - y);
    altDisplay.innerText = altitude;

    // Tilt effect
    if (e.code === 'KeyA') krrish.style.transform = `translate(-50%, -50%) rotate(-25deg)`;
    if (e.code === 'KeyD') krrish.style.transform = `translate(-50%, -50%) rotate(25deg)`;
});

document.addEventListener('keyup', () => {
    krrish.style.transform = `translate(-50%, -50%) rotate(0deg)`;
});