# Day-74 - Snake Game JS

Classic Snake Game built with Canvas + Vanilla JavaScript.

## Features
- 🐍 Canvas-based Snake with Eyes + Smooth Movement
- 🍎 Normal Apple = +10 Points
- 🌟 Golden Apple = +50 Points (15% Rare Chance)
- 🧱 Wall Collision + Self Collision = Game Over
- 🏆 High Score + Top 5 Scores (localStorage)
- ⏱️ Live Timer + Length Counter
- ⚡ 3 Difficulties - Easy (150ms) / Medium (110ms) / Hard (70ms)
- ⏸️ Pause / Resume (Space key)
- 🔄 Restart (Enter key)
- 🔊 Sound Effects (Web Audio API) - ON/OFF Toggle
- 📱 Mobile Controls - On-screen D-pad + Swipe on Canvas
- ⌨️ Keyboard - Arrow Keys + WASD
- 🌙 Dark / Light Mode Toggle
- 🎮 Overlay Screens - Start / Game Over / Pause

## Tech Stack
- HTML5 - Canvas, Layout
- CSS3 - Dark Theme, Grid, Responsive
- Vanilla JavaScript - Game Loop, Collision, Canvas Drawing

## File Structure
Day-074-Snake-Game-Js/
├── index.html
├── style.css
├── script.js
└── README.md

## How to Run
1. Keep all 4 files in same folder
2. Open `index.html` in browser
3. Click Start / Press Space
4. Use Arrow Keys / WASD to move
5. Eat apples, avoid walls & yourself

## Controls
| Key | Action |
|-----|--------|
| ↑ ↓ ← → / W A S D | Move Snake |
| Space | Pause / Resume / Start |
| Enter | Restart |
| Swipe / D-pad | Mobile Move |

## Logic Explained
- Snake = Array of `{x, y}` positions
- Every `step()` = New head added in direction, tail removed (unless eating)
- Food placed randomly, not on snake body
- Collision: `head.x < 0 || head.x >= GRID` = Wall Over
- Self: `snake.some(s => s.x === head.x && s.y === head.y)`
- Speed = `setInterval(step, speed)` - Lower = Faster
- Best score saved in `localStorage` key: `snake_best`

## Future Improvements
- Add Levels + Obstacles
- Add Power-ups (Slow motion, Shield)
- Add Multiplayer
- Add Leaderboard with Backend

---
Built as part of 100 Days of Code Challenge - Day 74