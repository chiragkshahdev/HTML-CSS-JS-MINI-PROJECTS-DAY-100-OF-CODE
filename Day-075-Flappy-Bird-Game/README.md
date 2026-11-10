# Day-75 - Flappy Bird Game

Classic Flappy Bird built with Canvas + Vanilla JavaScript.

## Features
- 🐤 Canvas Game - Bird, Pipes, Ground, Clouds
- 👆 Flap Controls - Click / Tap / Space / FLAP Button
- 🟢 3 Difficulties - Easy / Medium / Hard (Speed + Gap changes)
- 🐧 4 Birds to Choose - Yellow, Penguin, Parrot, Eagle
- 🌟 Golden Pipe = +5 Points (12% Rare)
- 🏆 Best Score + Top 5 Scores (localStorage)
- 🥇 Medal System - 10+ Star, 20+ Bronze, 30+ Silver, 40+ Gold
- 🌙 Day / Night Theme Toggle
- 🔊 Sound Effects (Web Audio API)
- ⏸️ Pause (P key) / Restart (Enter)
- 📱 Mobile Friendly - Big FLAP button + Touch
- 🎮 Games Played Counter

## Tech Stack
- HTML5 - Canvas
- CSS3 - Dark Theme, Responsive
- Vanilla JavaScript - Game Loop, Physics, Collision

## File Structure
Day-075-Flappy-Bird-Game/
├── index.html
├── style.css
├── script.js
└── README.md

## How to Run
1. Keep all 4 files in same folder
2. Open `index.html` in browser
3. Click Start / Press Space
4. Tap / Click / Space to Flap
5. Pipe ke beech se nikalo, ground & pipe se bacho

## Controls
| Key | Action |
|-----|--------|
| Space / Click / Tap | Flap |
| Enter | Restart |
| P | Pause / Resume |

## Logic Explained
- Gravity: `bird.vy += gravity; bird.y += vy`
- Flap: `bird.vy = -8` (upward thrust)
- Pipes spawn every `pipeInterval` frames
- Collision: Bird X overlaps pipe X AND (Y < topH OR Y > topH + gap)
- Ground: `bird.y > H - Ground_H` = Game Over
- Score: Pipe cross hone par +1, Golden pipe +5
- Best saved in `localStorage` key: `flappy_best`

## Future Improvements
- Add Parallax Background
- Add Power-ups (Shield, Slow)
- Add Multiplayer / Leaderboard Backend

---
Built as part of 100 Days of Code Challenge - Day 75