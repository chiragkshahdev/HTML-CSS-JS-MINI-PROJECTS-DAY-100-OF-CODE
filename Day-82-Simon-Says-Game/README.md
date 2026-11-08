# Day-82 - Simon Says Game

Classic Simon memory game - watch sequence, repeat it, survive!

## Features
- 🎵 4 Color Pads - Green, Red, Yellow, Blue (each has unique tone)
- 👀 Sequence Playback - Simon shows sequence, you repeat
- 🎯 Levels - Har level me +1 color, Score = Level x 10
- 😈 2 Modes - Normal (retry) vs Strict (game over on wrong)
- ⚡ 3 Speeds - Slow / Normal / Fast (Fast = +5 bonus)
- 🔥 Streak Tracking
- 🔁 Replay Sequence Button
- 🏆 Best Score + Top 5 Scores (localStorage)
- ⌨️ Keyboard - 1,2,3,4 keys
- 🔊 Real Tones - Web Audio API (E, C, A, E)
- 🌙 Dark Mode
- 📱 Mobile Friendly - Tap pads

## Tech Stack
- HTML5 - Circular Board
- CSS3 - 4-color pads, Glow effect, Shake animation
- Vanilla JavaScript - Sequence logic, Async playback, Web Audio

## File Structure
Day-82-Simon-Says-Game/
├── index.html
├── style.css
├── script.js
└── README.md

## How to Run
1. Keep all 4 files in same folder
2. Open `index.html` in browser
3. Click Start
4. Simon ki sequence dekho
5. Wahi sequence repeat karo
6. Level badhao, high score banao

## Controls
| Key | Action |
|-----|--------|
| 1 | Green Pad |
| 2 | Red Pad |
| 3 | Yellow Pad |
| 4 | Blue Pad |
| Enter | Start Game |
| Click | Tap Pad |

## Logic Explained
```js
// Core Loop
sequence = [] // e.g. ['green','red','green']
// Each level: push random color
sequence.push(randomColor())
// Playback: for each color -> light + tone, await delay
// Player: check playerInput[i] === sequence[i]
// If all match -> nextLevel()
// If mismatch -> Strict: Game Over | Normal: Replay same sequence