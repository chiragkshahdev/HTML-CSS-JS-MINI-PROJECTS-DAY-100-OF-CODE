# Day 48 - Custom Video Player 🎬

YouTube-like custom video player built from scratch without using default controls.

## Features
- Custom play/pause (big + small)
- Clickable progress bar with hover preview time
- Rewind 10s / Forward 10s
- Volume slider + Mute
- Playback speed 0.5x to 2x
- Picture-in-Picture (PiP)
- Fullscreen
- Keyboard shortcuts: Space, ArrowLeft/Right
- Playlist switcher
- Auto-hide controls on play

## Tech Stack
- HTML5 Video API
- CSS (gradients, transitions)
- Vanilla JavaScript
- Font Awesome icons

## Video API Used
- `play()`, `pause()`, `currentTime`, `duration`, `volume`, `playbackRate`
- `requestFullscreen()`, `requestPictureInPicture()`

## How to Run
Open `index.html`. Replace video src with your own:
```html
<source src="./myvideo.mp4">