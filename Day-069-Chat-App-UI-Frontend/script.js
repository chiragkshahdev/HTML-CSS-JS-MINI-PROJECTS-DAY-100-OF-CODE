// --- DATA ---
const DEFAULT_CHATS = [
  { id: 1, name: "Priya Sharma", avatar: "🌸", online: true, isGroup: false, unread: 2, messages: [
    { text: "Hey! Kal ka plan done hai? 😍", type: "in", time: "10:02 AM" },
    { text: "Haan, 5 baje Virar station pe milte hai", type: "out", time: "10:05 AM" },
    { text: "Perfect! Pizza bhi khayenge 🍕", type: "in", time: "10:06 AM" },
  ]},
  { id: 2, name: "Rahul Verma", avatar: "🔥", online: true, isGroup: false, unread: 0, messages: [
    { text: "Bhai Day-69 complete kiya?", type: "in", time: "09:15 AM" },
    { text: "Haan bas kar raha hu, Chat App bana raha hu", type: "out", time: "09:20 AM" },
  ]},
  { id: 3, name: "100 Days of Code 🚀", avatar: "💻", online: false, isGroup: true, unread: 5, messages: [
    { text: "Aman: Day-68 ka Instagram clone mast tha!", type: "in", time: "08:30 AM" },
    { text: "Priya: Day-69 me Chat App aayega", type: "in", time: "08:32 AM" },
  ]},
  { id: 4, name: "Mummy ❤️", avatar: "❤️", online: false, isGroup: false, unread: 0, messages: [
    { text: "Beta khana kha liya?", type: "in", time: "Yesterday" },
    { text: "Haan mummy, abhi khaya 😊", type: "out", time: "Yesterday" },
  ]},
  { id: 5, name: "Foodie Group 🍕", avatar: "🍕", online: false, isGroup: true, unread: 1, messages: [
    { text: "Sunday ko Virar me new cafe chale?", type: "in", time: "Yesterday" },
  ]},
];

const AUTO_REPLIES = [
  "Haan bilkul! 😊", "Achaa, sach me? 😮", "Hahaha sahi hai 😂", "Okay done! 👍",
  "Kal baat karte hai ispe", "🔥🔥 Mast idea hai!", "Samajh gaya, dekh ta hu", "❤️❤️"
];

// --- STATE ---
let chats = JSON.parse(localStorage.getItem('chat_day69')) || JSON.parse(JSON.stringify(DEFAULT_CHATS));
let activeId = null;
let filter = 'all';
let searchTerm = '';

function save() { localStorage.setItem('chat_day69', JSON.stringify(chats)); }
function nowTime() { return new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }); }
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}

// --- RENDER CHAT LIST ---
function renderList() {
  const listEl = document.getElementById('chatList');
  let filtered = chats.filter(c => {
    if (filter === 'unread' && c.unread === 0) return false;
    if (filter === 'groups' && !c.isGroup) return false;
    if (searchTerm && !c.name.toLowerCase().includes(searchTerm)) return false;
    return true;
  });

  if (filtered.length === 0) {
    listEl.innerHTML = `<p style="text-align:center;padding:30px;color:#888">No chats found 🔍</p>`;
  } else {
    listEl.innerHTML = filtered.map(c => {
      const last = c.messages[c.messages.length - 1];
      return `
      <div class="chat-item ${c.id === activeId ? 'active' : ''}" onclick="openChat(${c.id})">
        <div style="position:relative"><span class="avatar">${c.avatar}</span>${c.online ? '<span class="online-dot"></span>' : ''}</div>
        <div class="chat-item-info">
          <div class="chat-item-top"><b>${c.name}</b><small>${last ? last.time : ''}</small></div>
          <p>${last ? (last.type === 'out' ? '✓✓ ' : '') + last.text : 'No messages'}</p>
        </div>
        ${c.unread > 0 ? `<span class="unread-badge">${c.unread}</span>` : ''}
      </div>`;
    }).join('');
  }

  const totalUnread = chats.reduce((s,c)=>s+c.unread,0);
  document.getElementById('totalChats').textContent = chats.length;
  document.getElementById('totalUnread').textContent = totalUnread;
}

// --- OPEN CHAT ---
function openChat(id) {
  activeId = id;
  const chat = chats.find(c => c.id === id);
  chat.unread = 0;
  save(); renderList();

  document.getElementById('emptyChat').classList.add('hidden');
  document.getElementById('activeChat').classList.remove('hidden');
  document.getElementById('chatName').textContent = chat.name;
  document.getElementById('chatAvatar').textContent = chat.avatar;
  document.getElementById('chatStatus').textContent = chat.online ? 'online' : 'last seen today at 9:41 PM';
  document.getElementById('chatStatus').style.color = chat.online ? '#25d366' : '#888';

  // Mobile view
  document.querySelector('.sidebar').classList.add('hide-mobile');
  document.querySelector('.chat-window').classList.remove('hide-mobile');

  renderMessages();
  document.getElementById('msgInput').focus();
}

function renderMessages() {
  const chat = chats.find(c => c.id === activeId);
  if (!chat) return;
  const box = document.getElementById('messages');
  box.innerHTML = `<div class="date-sep">TODAY</div>` + chat.messages.map(m => `
    <div class="msg ${m.type}">${m.text}<span class="time">${m.time} ${m.type === 'out' ? '<span class="tick">✓✓</span>' : ''}</span></div>
  `).join('');
  box.scrollTop = box.scrollHeight;
}

// --- SEND MESSAGE + AUTO REPLY ---
function sendMessage() {
  const input = document.getElementById('msgInput');
  const text = input.value.trim();
  if (!text || !activeId) return;
  const chat = chats.find(c => c.id === activeId);
  chat.messages.push({ text, type: 'out', time: nowTime() });
  input.value = '';
  save(); renderMessages(); renderList();
  showToast('Message sent!');

  // Typing + Auto Reply
  const typing = document.getElementById('typing');
  typing.classList.remove('hidden');
  document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
  setTimeout(() => {
    typing.classList.add('hidden');
    const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
    chat.messages.push({ text: reply, type: 'in', time: nowTime() });
    save(); renderMessages(); renderList();
  }, 1500);
}

document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('msgInput').addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

// --- SEARCH & FILTER ---
document.getElementById('searchInput').addEventListener('input', e => {
  searchTerm = e.target.value.toLowerCase();
  renderList();
});
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.dataset.filter;
    renderList();
  });
});

// --- EMOJI ---
document.getElementById('emojiBtn').addEventListener('click', () => {
  document.getElementById('emojiBar').classList.toggle('hidden');
});
document.querySelectorAll('#emojiBar button').forEach(b => {
  b.addEventListener('click', () => {
    document.getElementById('msgInput').value += b.textContent;
    document.getElementById('msgInput').focus();
  });
});

// --- OTHER ACTIONS ---
document.getElementById('backBtn').addEventListener('click', () => {
  document.querySelector('.sidebar').classList.remove('hide-mobile');
  document.querySelector('.chat-window').classList.add('hide-mobile');
  activeId = null;
  document.getElementById('activeChat').classList.add('hidden');
  document.getElementById('emptyChat').classList.remove('hidden');
  renderList();
});

document.getElementById('clearChatBtn').addEventListener('click', () => {
  if (!activeId) return;
  if (confirm('Clear all messages in this chat?')) {
    chats.find(c => c.id === activeId).messages = [];
    save(); renderMessages(); renderList();
    showToast('Chat cleared 🗑️');
  }
});

document.getElementById('infoBtn').addEventListener('click', () => {
  const chat = chats.find(c => c.id === activeId);
  alert(`${chat.name}\n${chat.messages.length} messages\n${chat.online ? 'Online now' : 'Offline'}`);
});

document.getElementById('darkBtn').addEventListener('click', function() {
  document.body.classList.toggle('dark');
  this.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

document.getElementById('newChatBtn').addEventListener('click', () => {
  const name = prompt('Enter new contact name:');
  if (!name) return;
  const newChat = { id: Date.now(), name, avatar: "👤", online: true, isGroup: false, unread: 0, messages: [{ text: "Hi! 👋", type: "in", time: nowTime() }] };
  chats.unshift(newChat);
  save(); renderList(); openChat(newChat.id);
  showToast('New chat created!');
});

// Init - mobile hide chat window
if (window.innerWidth <= 768) document.querySelector('.chat-window').classList.add('hide-mobile');
renderList();