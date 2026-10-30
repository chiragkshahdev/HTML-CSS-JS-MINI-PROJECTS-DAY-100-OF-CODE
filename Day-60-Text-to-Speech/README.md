# Day 60 - Text to Speech Converter

Simple, fast and modern Text to Speech app using Web Speech API.
Built with HTML, CSS, JS in separate files.

## Live Demo
Just open `index.html` - No installation needed.

## Files
- `index.html` - UI Structure
- `style.css` - Dark Modern Styling
- `script.js` - Speech Logic
- `README.md` - Documentation

## Features
- Type any text and convert to speech
- 20+ System Voices (Male/Female/Languages)
- Speed Control (0.5x - 2x)
- Pitch Control (0 - 2)
- Volume Control (0 - 100%)
- Play, Pause, Resume, Stop
- Character Counter
- Speaking Status Indicator

## How To Run
1. Download all 3 files
2. Keep them in same folder
3. Open `index.html` in Chrome
4. Type text > Select Voice > Click Speak

## Browser Support
- Chrome - Best (Most voices)
- Edge - Good
- Safari - Limited voices
- Firefox - Limited voices

## Code Example
```javascript
const utterance = new SpeechSynthesisUtterance("Hello World");
utterance.voice = voices[0];
utterance.rate = 1;
utterance.pitch = 1;
window.speechSynthesis.speak(utterance);