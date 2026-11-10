# Day 22 - Bouncing Ball Physics 🏀

> PHASE 2: CSS Mastery & Animation | What You Learn: @keyframes bounce + JS Physics

Realistic bouncing ball simulation with gravity, friction, and collision detection.

### 🚀 Live Demo
[View Live](https://...)

### 🧠 What I Learned
- `gravity` and `friction` implementation in JS
- `requestAnimationFrame` for smooth 60fps animation
- Canvas API - `arc()`, `fill()`, `shadowBlur`
- Collision detection (wall, ground, ball-to-ball)
- `airFriction` to make motion natural

### 🛠️ Core Logic
```js
vy += gravity
y += vy
if(y + radius > canvas.height) vy = -vy * 0.8