# Day-71 - Facebook Post Clone

Facebook-style feed with real like / comment / share logic.

## Features
- 🏠 Facebook Layout - Navbar, Left Menu, Feed, Contacts
- 📸 Stories Row with Create Story
- ✍️ Create Post - Type + Publish (appears on top)
- 👍 Like / Unlike Post (Image click also likes)
- 💬 Add Comment (Enter key works)
- 👍 Like / Delete Individual Comments
- ↗️ Share Post with Modal + Share Count increases
- 🔖 Save / Unsave Post + Filter by Saved / Liked
- 🔍 Search Posts (Top Search Bar)
- 📊 Live Stats Sidebar - Total Likes, Comments, Shares
- 💾 localStorage Persistence - Refresh par bhi posts rahenge
- 🔄 Reset Feed Button
- 📱 Fully Responsive

## Tech Stack
- HTML5 - Navbar, Feed, Stories, Sidebar
- CSS3 - Facebook Theme (#1877f2, #f0f2f5), Grid, Flexbox
- Vanilla JavaScript - State, Rendering, Filters

## File Structure
Day-071-Facebook-Post-Clone/
├── index.html
├── style.css
├── script.js
└── README.md

## How to Run
1. Keep all 4 files in same folder
2. Open `index.html` in browser
3. Type in "What's on your mind" -> Click Post
4. Like, Comment, Share, Save any post
5. Try Filters: All / Liked / Saved
6. Refresh - data will stay

## Logic Explained
- Posts: `posts = [{ id, user, text, likes, liked, saved, shares, comments: [...] }]`
- Like toggle: `liked = !liked; likes += liked ? 1 : -1`
- Comments per post: `post.comments.push({ user: 'You Dev', text })`
- Share increases `shares++` after modal confirm
- Saved in `localStorage` key: `fb_day71`

## Future Improvements
- Add Image Upload for new post
- Add Reactions (❤️ 😮 😢) long-press
- Add Story Viewer
- Connect to Backend / Firebase

---
Built as part of 100 Days of Code Challenge - Day 71