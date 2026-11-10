const canvas = document.getElementById('webCanvas');
const ctx = canvas.getContext('2d');
const crosshair = document.getElementById('crosshair');
const counterEl = document.getElementById('counter');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let webs = []; // Store all permanent webs
let currentWeb = null;
let isShooting = false;
let count = 0;

// Resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Mouse move for crosshair
document.addEventListener('mousemove', (e) => {
    crosshair.style.left = e.clientX + 'px';
    crosshair.style.top = e.clientY + 'px';

    if(isShooting && currentWeb){
        currentWeb.endX = e.clientX;
        currentWeb.endY = e.clientY;
    }
});

document.addEventListener('mousedown', (e) => {
    isShooting = true;
    currentWeb = {
        startX: e.clientX,
        startY: e.clientY,
        endX: e.clientX,
        endY: e.clientY,
        life: 1, // for fade
        isPermanent: false
    };
    // Vibrate effect
    document.body.style.transform = `translate(${Math.random()*4-2}px, ${Math.random()*4-2}px)`;
    setTimeout(()=> document.body.style.transform = 'translate(0,0)', 50);
});

document.addEventListener('mouseup', (e) => {
    if(!isShooting) return;
    isShooting = false;

    // Make it permanent
    if(currentWeb){
        currentWeb.isPermanent = true;
        webs.push({...currentWeb});
        count++;
        counterEl.textContent = `Webs Shot: ${count}`;

        // Create splat effect
        createSplat(currentWeb.endX, currentWeb.endY);
    }
    currentWeb = null;
});

function createSplat(x, y){
    // White dot with glow where web sticks
    const splat = {
        x, y,
        radius: 0,
        maxRadius: 8 + Math.random()*12,
        life: 1
    };

    function animateSplat(){
        splat.radius += 1;
        splat.life -= 0.05;
        if(splat.life > 0){
            ctx.beginPath();
            ctx.arc(splat.x, splat.y, splat.radius, 0, Math.PI*2);
            ctx.fillStyle = `rgba(255,255,255,${splat.life})`;
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'white';
            ctx.fill();
            ctx.shadowBlur = 0;
            requestAnimationFrame(animateSplat);
        }
    }
    animateSplat();
}

// Main Render Loop
function render(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all permanent webs
    webs.forEach(web => {
        drawWebLine(web.startX, web.startY, web.endX, web.endY, false);
    });

    // Draw current shooting web
    if(currentWeb){
        drawWebLine(currentWeb.startX, currentWeb.startY, currentWeb.endX, currentWeb.endY, true);
    }

    requestAnimationFrame(render);
}

function drawWebLine(x1, y1, x2, y2, isActive){
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx*dx + dy*dy);

    // Web is slightly wavy
    const segments = Math.floor(distance / 10);
    ctx.beginPath();
    ctx.moveTo(x1, y1);

    for(let i=1; i<=segments; i++){
        const t = i / segments;
        const x = x1 + dx * t;
        // Add sine wave for organic web feel
        const wave = Math.sin(t * Math.PI * 4) * (isActive? 5 : 2) * Math.sin(Date.now()/200);
        const y = y1 + dy * t + wave;
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = isActive? '#ffffff' : 'rgba(220,220,220,0.7)';
    ctx.lineWidth = isActive? 2.5 : 1.5;
    ctx.shadowBlur = isActive? 10 : 5;
    ctx.shadowColor = 'white';
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Second thin line for double web strand
    ctx.beginPath();
    ctx.moveTo(x1+1, y1);
    ctx.lineTo(x2+1, y2);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
}

render();

// Double tap for mobile
canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    document.dispatchEvent(new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
    }));
});

canvas.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    document.dispatchEvent(new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    }));
});

canvas.addEventListener('touchend', (e) => {
    document.dispatchEvent(new MouseEvent('mouseup', {}));
});