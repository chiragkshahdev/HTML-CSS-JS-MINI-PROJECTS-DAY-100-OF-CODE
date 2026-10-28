# Day 49 - Voice to Text App 🎤

Convert speech to text in real-time using Web Speech API.

## Features
- Real-time transcription (final + interim)
- 8 Languages: English, Hindi, Spanish, French, German, Japanese, Arabic
- Live waveform animation
- Word & Character count
- Copy / Clear / Download as .txt
- Text-to-Speech playback
- History (last 10, saved in LocalStorage)
- Works offline for UI, online for recognition

## Tech Stack
- Web Speech API (SpeechRecognition)
- Web Speech Synthesis API
- Vanilla JavaScript
- CSS animations (pulse, wave)

## API Used
- `window.SpeechRecognition` / `webkitSpeechRecognition`
- `continuous: true`, `interimResults: true`

## How to Use
1. Open `index.html` in Chrome (best support)
2. Select language
3. Tap mic → Speak → Tap again to stop
4. Interim text shows in gray, final in white textarea

## Browser Support
Chrome / Edge recommended. Firefox has limited support.

## How to Run
No server needed. Just open `index.html`.

## Day 49 of 100 Days of Code