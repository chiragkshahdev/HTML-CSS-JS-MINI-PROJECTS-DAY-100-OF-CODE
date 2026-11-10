# Day-81 - Tetris Basic

Classic Tetris with 7 tetrominoes, line clears, levels, hold & ghost piece.

## Features
- 🧱 7 Tetrominoes - I, J, L, O, S, T, Z (SRS shapes)
- 🔄 Rotate with Wall Kick - Edge pe rotate karne par auto-shift
- 👻 Ghost Piece - Kahan girega, pehle se dikhega
- 📦 Hold Piece - C se piece save karo, ek baar per drop
- ➡️ Next Piece Preview
- 💥 Line Clear Scoring - 1=100, 2=300, 3=500, 4=800 (Tetris)
- 🚀 Levels - Har 10 lines = Level up + Speed up
- ⬇️ Hard Drop (Space) + Soft Drop (↓)
- 🏆 Best Score + Top 5 (localStorage)
- 🔊 Sound Effects
- ⏸️ Pause / Restart
- 📱 Mobile Controls

## Tech Stack
- HTML5 - Canvas
- CSS3 - Dark Theme, Responsive
- Vanilla JavaScript - Game Loop, Rotation, Collision

## File Structure
Day-081-Tetris-Basic/
├── index.html
├── style.css
├── script.js
└── README.md

## How to Run
1. Keep all 4 files in same folder
2. Open `index.html` in browser
3. Click Start
4. Arrow keys se move/rotate karo
5. Lines clear karo, top tak stack mat hone do

## Controls
| Key | Action |
|-----|--------|
| ← → | Move |
| ↓ | Soft Drop (+1 per cell) |
| ↑ / X | Rotate |
| Space | Hard Drop |
| C | Hold |
| P | Pause |
| Enter | Restart |

## Logic Explained
```js
// Rotate = Transpose + Reverse
function rotate(matrix) {
  // [ [1,0], [1,1] ] -> Transpose -> Reverse rows
}
// Collision: Check if any filled cell hits wall / locked block / bottom
// Line Clear: Row full? -> splice + unshift empty row
// Ghost: Simulate drop until collision, draw translucent
// Speed: dropInterval = 800 - (level-1)*70  (Level 10 = ~170ms)