# Day-78 - Whack-a-Mole Game

Classic Whack-a-Mole arcade game with moles, bombs, golden moles, combo system.

## Features
- 🐹 3x3 Grid - 9 Holes, Moles randomly pop up
- 🔨 Hammer Cursor - Mouse follow + Swing animation on click
- ⏱️ 30 Sec Timer + Time Bar
- ⭐ Golden Mole = +50 Points (15%, only 0.6 sec)
- 💣 Bomb = -20 Points (Don't hit!)
- ❤️ Heart Mole = +5 Seconds Extra Time
- 🔥 Combo System - 3+ hits = Bonus, 5+ = Double, 10+ = Triple
- 🎯 Accuracy Tracking - Hits / (Hits + Miss)
- 🏆 Best Score + Top 5 Scores (localStorage)
- 🏅 Rank System - Newbie to Mole Master
- ⚡ 3 Difficulties - Easy / Medium / Hard (Spawn speed changes)
- 🔊 Sound Effects
- ⏸️ Pause / Restart
- 📱 Mobile Friendly - Tap to Whack

## Tech Stack
- HTML5 - Grid Board
- CSS3 - Grass Theme, Mole Animation, Hammer
- Vanilla JavaScript - Spawn Logic, Timer, Combo

## File Structure
Day-78-Whack-a-Mole-Game/
├── index.html
├── style.css
├── script.js
└── README.md

## How to Run
1. Keep all 4 files in same folder
2. Open `index.html` in browser
3. Click Start
4. Mole pe click / tap karo
5. Bomb se bacho, Golden ko pakdo

## Scoring
| Mole | Points | Chance |
|------|--------|--------|
| 🐹 Normal | +10 (Combo 5+ = +20, 10+ = +30) | 70% |
| ⭐ Golden | +50 | 15% |
| ❤️ Heart | +10 + 5 Sec | 7% |
| 💣 Bomb | -20 | 8% |

## Logic Explained
- `spawnMole()` picks random empty hole every 600-800ms
- Mole stays up for `moleUp` ms (Easy 1100ms, Hard 650ms)
- Click: Check `mole.up` + `hit` flag -> Score update
- Empty hole click = Miss, Combo reset
- Timer: `setInterval` 1 sec, timeLeft--, 0 = Game Over
- Best saved in `localStorage` key: `mole_best`

## Future Improvements
- Add Levels with increasing speed
- Add Different Maps (Beach, Snow)
- Add 2 Player Mode
- Add Power-up: Freeze Time

---
Built as part of 100 Days of Code Challenge - Day 78