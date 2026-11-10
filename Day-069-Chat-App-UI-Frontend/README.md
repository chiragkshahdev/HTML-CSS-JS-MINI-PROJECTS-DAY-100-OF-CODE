# Day-69 - Chat App UI Frontend

WhatsApp-style chat app with real frontend logic.

## Features
- 💬 Chat List with Last Message, Time, Unread Badge
- 🔍 Live Search Chats
- 🏷️ Filters: All / Unread / Groups
- 🟢 Online Status + Online Dot
- ✉️ Send Message (Enter key also works)
- 🤖 Auto Reply + Typing Indicator (1.5 sec delay)
- 😀 Emoji Picker - Click emoji to add to message
- 🌙 Dark Mode Toggle
- ➕ New Chat - Add new contact
- 🗑️ Clear Chat
- ℹ️ Chat Info
- 💾 localStorage Persistence - Refresh karne par bhi chats rahenge
- 📱 Fully Responsive - Mobile me WhatsApp jaisa back button
- ✓✓ Blue Double Tick for sent messages

## Tech Stack
- HTML5 - Sidebar, Chat Window, Input Bar
- CSS3 - Grid, Flexbox, WhatsApp Theme, Dark Mode
- Vanilla JavaScript - State, Rendering, Auto-Reply Logic

## File Structure
Day-069-Chat-App-UI-Frontend/
├── index.html
├── style.css
├── script.js
└── README.md

## How to Run
1. Keep all 4 files in same folder
2. Open `index.html` in browser
3. Click any chat -> Type message -> Press Enter
4. Wait 1.5 sec - Auto reply aayega with typing indicator
5. Try Search, Unread filter, Dark Mode, New Chat

## Logic Explained
- Chats stored as array: `chats = [{ id, name, messages: [...] }]`
- Messages: `{ text, type: 'in'/'out', time }`
- Unread resets to 0 on `openChat(id)`
- Auto-reply picks random reply from `AUTO_REPLIES`
- All data saved in `localStorage` key: `chat_day69`

## Future Improvements
- Add Image / Voice message UI
- Add Group creation
- Connect to Socket.io / Firebase for real-time chat
- Add Message Delete / Edit

---
Built as part of 100 Days of Code Challenge - Day 69