# Day-68 - Instagram Like & Comment System

Instagram-style feed with real like / comment logic.

## Features
- ❤️ Single Tap Like + Unlike with animation
- ❤️❤️ Double-Tap on Image to Like (Instagram style) + Big Heart animation
- 💬 Add Comment (Enter key also works)
- ❤️ Like / Unlike individual Comments
- ✕ Delete Comments
- 🔖 Save / Unsave Post
- ➕ Follow / Unfollow (Post + Suggestions)
- ✈️ Share - Copies link
- 💾 localStorage Persistence - Refresh karne par bhi likes/comments rahenge
- 📊 Live Stats in Sidebar - Total Likes + Comments
- 🔄 Reset Button to clear data

## Tech Stack
- HTML5 - Feed, Posts, Stories, Sidebar
- CSS3 - Instagram UI, Gradient Story Rings, Animations
- Vanilla JavaScript - State Management, Double-Tap Detection, Rendering

## File Structure
Day-068-Instagram-Like-Comment-System/
├── index.html
├── style.css
├── script.js
└── README.md

## How to Run
1. Keep all 4 files in same folder
2. Open `index.html` in browser
3. Double-tap image to like
4. Type comment and press Post / Enter
5. Refresh page - data will stay (localStorage)

## Logic Explained
- Likes stored as: `state.likes[postId]`
- Liked status: `state.likedPosts[postId] = true/false`
- Comments stored as array per post: `state.comments[postId] = [...]`
- Double-tap = 2 clicks within 300ms
- All state saved in `localStorage` key: `insta_day68`

## Future Improvements
- Add Story viewer
- Add emoji picker in comments
- Add image upload / new post
- Connect to backend / Firebase

---
Built as part of 100 Days of Code Challenge - Day 68