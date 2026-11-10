# Day 91 - Blog Website UI

A clean and modern blog website UI with search, filter, dark mode and reading view.

## Features
- Featured post hero section
- Search blogs by title, author, category
- Category filter: Tech, Coding, Life, Travel, Money
- Click any blog to read full story in modal
- Dark / Light mode toggle
- About section with stats
- Newsletter subscribe with validation
- Fully responsive

## Tech Used
- HTML, CSS, JavaScript
- No backend, data is in script.js array
- Images from Unsplash + Pravatar

## How to Run
1. Download all 4 files in same folder
2. Double click `index.html`
3. Or use VS Code Live Server

## How to Add Your Own Blog
Open `script.js`, find `blogs` array and add:
```js
{ id: 10, title: "Your Title", category: "Tech", author: "Your Name", date: "Nov 10, 2026", read: "5 min read", img: "image-link", desc: "Short desc", content: "Full story..." }