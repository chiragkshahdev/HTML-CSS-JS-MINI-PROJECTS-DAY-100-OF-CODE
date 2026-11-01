# Day 65 - Instagram Story Viewer

Insta-style story viewer clone.

## Features
- Gradient story ring (seen/unseen state)
- Horizontal stories bar with scroll
- Full-screen viewer with progress bars
- Tap left/right to navigate, auto-play 5s per story
- Hold to pause (mouse/touch)
- Keyboard support: Arrow keys + ESC
- Zoom-in animation like Instagram
- Mark as seen

## Files
- index.html
- style.css
- script.js
- README.md

## How it Works
- Users array with stories
- openViewer() sets active user/story
- Progress bar animation via CSS width 0->100% in 5s
- Timer auto calls nextStory()
- renderBar() re-renders seen state

## Run
Open index.html

Day 65 / 100DaysOfCode