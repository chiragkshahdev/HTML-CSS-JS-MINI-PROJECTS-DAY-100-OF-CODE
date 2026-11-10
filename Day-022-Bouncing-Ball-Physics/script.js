const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const countSpan = document.getElementById('count');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = [];
const gravity = 0.5;
const friction = 0.8; // Kitna bounce hoga
const airFriction = 0.99;

class Ball {
    constructor(x, y) {
        this.x = x || canvas.width / 2;
        this.y = y || 100;
        this.radius = Math.random() * 20 + 15;
        this.vx = (Math.random() - 0.5) * 10; // Horizontal velocity
        this.vy = Math.random() * 2;
        this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
    }

    update() {
        this.vy += gravity; // Gravity lagao
        this.x += this.vx;
        this.y += this.vy;

        this.vx *= airFriction;
        this.vy *= airFriction;

        // Ground collision
        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.vy = -this.vy * friction; // Bounce back

            // Agar velocity bahut kam hai to rok do
            if (Math.abs(this.vy) < 0.8) this.vy = 0;
            if (Math.abs(this.vx) < 0.1) this.vx = 0;
        }

        // Wall collision
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.vx = -this.vx * friction;
            this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function animate() {
    ctx.fillStyle = 'rgba(15, 15, 15, 0.2)'; // Trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        ball.update();
        ball.draw();
    });

    // Ball-to-ball collision simple
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            let dx = balls[j].x - balls[i].x;
            let dy = balls[j].y - balls[i].y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < balls[i].radius + balls[j].radius) {
                // Simple elastic collision
                [balls[i].vx, balls[j].vx] = [balls[j].vx, balls[i].vx];
                [balls[i].vy, balls[j].vy] = [balls[j].vy, balls[i].vy];
            }
        }
    }

    requestAnimationFrame(animate);
}

// Events
balls.push(new Ball());

canvas.addEventListener('click', (e) => {
    balls.push(new Ball(e.clientX, e.clientY));
    countSpan.textContent = balls.length;
});

document.getElementById('addBall').addEventListener('click', () => {
    balls.push(new Ball());
    countSpan.textContent = balls.length;
});

document.getElementById('reset').addEventListener('click', () => {
    balls = [new Ball()];
    countSpan.textContent = 1;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();