# Day-70 - WhatsApp Web Clone UI

Pixel-perfect WhatsApp Web clone with real chat logic.

## Features
- 🟢 WhatsApp Web Layout - Green top bar + 2-panel UI
- 💬 Chat List with Pinned 📌, Muted 🔕, Unread Badge, Double Tick ✓✓
- 🔍 Live Search Chats + Search Inside Chat
- 🏷️ Filters: All / Unread / Favourites / Groups
- 📦 Archived Chats (UI)
- 📸 Status Viewer - Click Status button to see statuses
- ✉️ Send Message + Auto Reply with Typing Indicator
- 😀 Emoji Panel
- 🎙️ Voice Button (UI)
- 🔔 Mute / Unmute Chat
- 🗑️ Clear Chat
- 🌙 Dark Mode
- ➕ New Chat
- 💾 localStorage Persistence - Refresh par bhi chats rahenge
- 📱 Fully Responsive - Mobile me Back button

## Tech Stack
- HTML5 - WhatsApp Web Structure
- CSS3 - WhatsApp Theme (#00a884, #d9fdd3, #efeae2), Grid, Flexbox
- Vanilla JavaScript - State, Filters, Auto-Reply

## File Structure
Day-070-WhatsApp-Web-Clone-UI/
├── index.html
├── style.css
├── script.js
└── README.md

## How to Run
1. Keep all 4 files in same folder
2. Open `index.html` in browser
3. Click any chat -> Type message -> Enter
4. Click Status (◉) button to see Status
5. Try Filters, Dark Mode, Mute, Search

## Logic Explained
- Chats: `chats = [{ id, name, pinned, muted, fav, messages: [...] }]`
- Pinned chats sorted on top: `list.sort((a,b) => b.pinned - a.pinned)`
- Messages: `{ text, type: 'in'/'out', time }`
- Auto-reply after 1.5 sec with typing indicator
- Saved in `localStorage` key: `wa_day70`

## Difference from Day-69
- Day-69 = Generic Chat App UI
- Day-70 = Exact WhatsApp Web Clone (colors, layout, status, archived, favourites)

## Future Improvements
- Add Image / File send
- Add Group creation
- Connect to Socket.io / Firebase for real-time

---
Built as part of 100 Days of Code Challenge - Day 70