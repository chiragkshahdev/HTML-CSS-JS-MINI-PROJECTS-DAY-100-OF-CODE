const plane = document.getElementById('plane');
const shadow = document.getElementById('shadow');
const btn = document.getElementById('restartBtn');

let y = 10; // top %
let velocity = 0;
let rotation = 45;
let gravity = 0.18;
let isFalling = true;
let animationId;

function fall() {
    if (!isFalling) return;
    
    velocity += gravity;
    y += velocity;
    rotation += velocity * 0.8;

    // Shadow scale effect
    let shadowScale = Math.max(0.3, 1 - y/100);
    shadow.style.transform = `translateX(-50%) scale(${shadowScale})`;

    plane.style.top = y + '%';
    plane.style.transform = `translateX(-50%) rotate(${rotation}deg)`;

    if (y >= 75) {
        // Crash
        y = 75;
        isFalling = false;
        plane.style.transform = `translateX(-50%) rotate(90deg)`;
        btn.style.display = 'block';
        cancelAnimationFrame(animationId);
        return;
    }
    animationId = requestAnimationFrame(fall);
}

function restart() {
    y = 10;
    velocity = 0;
    rotation = 45;
    isFalling = true;
    btn.style.display = 'none';
    fall();
}

plane.addEventListener('click', () => {
    velocity = -4; // Give a little lift on click
});

btn.addEventListener('click', restart);
fall();