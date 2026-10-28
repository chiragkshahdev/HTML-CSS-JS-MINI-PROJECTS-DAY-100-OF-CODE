# Day 47 - Music Player 🎵

A sleek glassmorphism music player with playlist, shuffle, repeat and volume control.

## Features
- Play / Pause / Next / Prev
- Clickable progress bar (seek)
- Current / Duration timer
- Shuffle & Repeat (loop)
- Volume slider
- Clickable playlist
- Vinyl animation when playing
- Glassmorphism UI
- Font Awesome icons

## Tech Stack
- HTML5 Audio API
- CSS Glassmorphism + Animations
- Vanilla JavaScript
- Unsplash covers + SoundHelix demo MP3s

## Audio API Used
- `audio.play() / pause()`
- `timeupdate` for progress
- `ended` for auto-next

## How to Run
Open `index.html`. Replace `src` URLs with your own MP3 files in `script.js` array.

To use local MP3s:
```js
src: "./songs/song1.mp3"