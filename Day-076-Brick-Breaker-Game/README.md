# Day-76 - Brick Breaker Game

Classic Brick Breaker / Breakout game with Canvas + JS.

## Features
- 🧱 Canvas Game - Paddle, Ball, Bricks, Power-ups
- 🖱️ Mouse Control + Keyboard (← → / A D) + Mobile Buttons
- 🚀 Launch Ball with Space / Click
- 🎯 Angle Physics - Paddle edge se maro to angle change hoga
- ⚡ Power-ups - Wide Paddle, Multi Ball, Slow Ball, +1 Life
- ✨ Power Bricks - ✨ wale bricks se power-up girta hai
- 💪 2-Hit Bricks - White bricks ko 2 baar marna padega
- ❤️ 3 Lives System - Ball miss = Life loss
- 🎯 Levels - Har level me zyada bricks + faster ball + Bonus +100
- 🏆 Best Score + Top 5 Scores (localStorage)
- ⚡ 3 Difficulties - Easy / Medium / Hard
- 🔊 Sound Effects (Web Audio API)
- ⏸️ Pause (Space / P) / Restart (Enter)
- 📱 Mobile Friendly - Touch drag + Buttons

## Tech Stack
- HTML5 - Canvas
- CSS3 - Dark Theme, Responsive
- Vanilla JavaScript - Game Loop, Collision, Physics

## File Structure
Day-076-Brick-Breaker-game/
├── index.html
├── style.css
├── script.js
└── README.md

## How to Run
1. Keep all 4 files in same folder
2. Open `index.html` in browser
3. Click Start
4. Mouse se paddle move karo, Space se ball launch karo
5. Saare bricks todo, lives bachao

## Controls
| Key | Action |
|-----|--------|
| Mouse / Touch | Move Paddle |
| ← → / A D | Move Paddle |
| Space / Click | Launch Ball / Pause |
| Enter | Restart |
| P | Pause |

## Logic Explained
- Bricks = Array of `{x, y, w, h, hits, isPower}`
- Ball-Brick Collision: `AABB check` - overlap se bounce direction decide
- Paddle Angle: `hitPos = (ballX - paddleX)/paddleW - 0.5` -> angle = hitPos * 60°
- Power-up: Brick break par power girta hai, paddle catch kare to apply
- Level Complete: `bricks.every(b => b.broken)` -> Next Level
- Best saved in `localStorage` key: `brick_best`

## Future Improvements
- Add Boss Levels
- Add Laser Paddle Power-up
- Add Particle Effects on Break
- Add 2 Player Mode

---
Built as part of 100 Days of Code Challenge - Day 76