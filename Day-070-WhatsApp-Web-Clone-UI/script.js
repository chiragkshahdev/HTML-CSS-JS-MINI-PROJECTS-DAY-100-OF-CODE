const DEFAULT_CHATS = [
  { id: 1, name: "Priya Sharma 🌸", avatar: "🌸", online: true, isGroup: false, fav: true, unread: 2, muted: false, pinned: true, messages: [
    { text: "Hey! WhatsApp Web Clone kaisa laga?", type: "in", time: "10:02 AM" },
    { text: "Ekdam real jaisa lag raha hai 😍", type: "out", time: "10:05 AM" },
    { text: "Haan Day-70 me to full clone bana diya!", type: "in", time: "10:06 AM" },
  ]},
  { id: 2, name: "Rahul Verma", avatar: "🔥", online: true, isGroup: false, fav: false, unread: 0, muted: false, pinned: false, messages: [
    { text: "Bhai kal milte hai Virar me", type: "in", time: "09:15 AM" },
    { text: "Done, 5 baje station pe", type: "out", time: "09:20 AM" },
  ]},
  { id: 3, name: "100 Days of Code 🚀", avatar: "💻", online: false, isGroup: true, fav: true, unread: 5, muted: true, pinned: false, messages: [
    { text: "Aman: Day-70 WhatsApp Clone 🔥", type: "in", time: "08:30 AM" },
    { text: "Priya: Sabse best project hai ye", type: "in", time: "08:32 AM" },
  ]},
  { id: 4, name: "Mummy ❤️", avatar: "❤️", online: false, isGroup: false, fav: true, unread: 0, muted: false, pinned: false, messages: [
    { text: "Beta khana kha liya?", type: "in", time: "Yesterday" },
    { text: "Haan mummy, kha liya 😊", type: "out", time: "Yesterday" },
  ]},
  { id: 5, name: "Family Group 👨‍👩‍👧", avatar: "👨‍👩‍👧", online: false, isGroup: true, fav: false, unread: 1, muted: false, pinned: false, messages: [
    { text: "Sunday ko sab ghar aa jao", type: "in", time: "Yesterday" },
  ]},
];

const REPLIES = ["Haan bilkul! 😊","Achaa sach me? 😮","Hahaha sahi hai 😂","Okay done! 👍","Kal baat karte hai","🔥🔥 Mast hai!","Samajh gaya","❤️❤️","WhatsApp Web mast bana hai!"];
const STATUSES = [
  { name: "Priya Sharma", avatar: "🌸", text: "At Marine Drive 🌊 • 12 min ago" },
  { name: "Rahul Verma", avatar: "🔥", text: "Gym time 💪 • 45 min ago" },
  { name: "Mummy", avatar: "❤️", text: "Blessings 🙏 • 2 hrs ago" },
];

let chats = JSON.parse(localStorage.getItem('wa_day70')) || JSON.parse(JSON.stringify(DEFAULT_CHATS));
let activeId = null, filter = 'all', searchTerm = '', isMuted = false;

function save() { localStorage.setItem('wa_day70', JSON.stringify(chats)); }
function nowTime() { return new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }); }
function showToast(m) { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 1800); }

function renderList() {
  const el = document.getElementById('chatList');
  let list = chats.filter(c => {
    if (filter === 'unread' && c.unread === 0) return false;
    if (filter === 'favourites' && !c.fav) return false;
    if (filter === 'groups' && !c.isGroup) return false;
    if (searchTerm && !c.name.toLowerCase().includes(searchTerm)) return false;
    return true;
  });
  // Pinned first
  list.sort((a,b) => (b.pinned - a.pinned));

  el.innerHTML = list.length === 0 ? `<p style="text-align:center;padding:30px;color:#888">No chats found 🔍</p>` : list.map(c => {
    const last = c.messages[c.messages.length-1];
    return `<div class="chat-item ${c.id===activeId?'active':''}" onclick="openChat(${c.id})">
      <span class="avatar">${c.avatar}</span>
      <div class="chat-item-info">
        <div class="chat-top"><b>${c.name}</b><small>${last?last.time:''}</small></div>
        <p>${last ? (last.type==='out'?'✓✓ ':'') + last.text : 'No messages'}</p>
      </div>
      <div class="chat-item-right">
        ${c.pinned?'<span class="pin">📌</span>':''}
        ${c.muted?'<span class="muted">🔕</span>':''}
        ${c.unread>0?`<span class="unread">${c.unread}</span>`:''}
      </div>
    </div>`;
  }).join('');
}

function openChat(id) {
  activeId = id;
  const chat = chats.find(c=>c.id===id);
  chat.unread = 0; isMuted = chat.muted;
  save(); renderList();
  document.getElementById('emptyState').classList.add('hidden');
  document.getElementById('statusView').classList.add('hidden');
  document.getElementById('activeChat').classList.remove('hidden');
  document.getElementById('chatName').textContent = chat.name;
  document.getElementById('chatAvatar').textContent = chat.avatar;
  document.getElementById('chatStatus').textContent = chat.online ? 'online' : 'last seen today at 9:41 PM';
  document.getElementById('chatStatus').style.color = chat.online ? '#25d366' : '#667781';
  document.getElementById('muteBtn').textContent = isMuted ? '🔕' : '🔔';
  document.querySelector('.left').classList.add('hide-m');
  document.querySelector('.right').classList.remove('hide-m');
  renderMessages();
  document.getElementById('msgInput').focus();
}

function renderMessages() {
  const chat = chats.find(c=>c.id===activeId);
  if (!chat) return;
  const box = document.getElementById('messages');
  box.innerHTML = `<div class="date-sep">TODAY</div>` + chat.messages.map(m => `<div class="msg ${m.type}">${m.text}<span class="time">${m.time} ${m.type==='out'?'<span class="tick">✓✓</span>':''}</span></div>`).join('');
  box.parentElement.scrollTop = box.parentElement.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('msgInput');
  const text = input.value.trim();
  if (!text || !activeId) return;
  const chat = chats.find(c=>c.id===activeId);
  chat.messages.push({ text, type: 'out', time: nowTime() });
  input.value = ''; save(); renderMessages(); renderList();
  showToast('Message sent ✓✓');
  const typing = document.getElementById('typing');
  typing.classList.remove('hidden');
  setTimeout(() => {
    typing.classList.add('hidden');
    const reply = REPLIES[Math.floor(Math.random()*REPLIES.length)];
    chat.messages.push({ text: reply, type: 'in', time: nowTime() });
    save(); renderMessages(); renderList();
  }, 1500);
}

document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('micBtn').addEventListener('click', () => showToast('🎙️ Voice message recording... (UI only)'));
document.getElementById('msgInput').addEventListener('keydown', e => { if (e.key==='Enter') sendMessage(); });

document.getElementById('searchInput').addEventListener('input', e => { searchTerm = e.target.value.toLowerCase(); renderList(); });
document.querySelectorAll('.filter').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));
  b.classList.add('active'); filter = b.dataset.filter; renderList();
}));

document.getElementById('emojiBtn').addEventListener('click', () => document.getElementById('emojiPanel').classList.toggle('hidden'));
document.querySelectorAll('#emojiPanel button').forEach(b => b.addEventListener('click', () => {
  document.getElementById('msgInput').value += b.textContent;
  document.getElementById('msgInput').focus();
}));

document.getElementById('backBtn').addEventListener('click', () => {
  document.querySelector('.left').classList.remove('hide-m');
  document.querySelector('.right').classList.add('hide-m');
  activeId = null;
  document.getElementById('activeChat').classList.add('hidden');
  document.getElementById('emptyState').classList.remove('hidden');
  renderList();
});

document.getElementById('clearBtn').addEventListener('click', () => {
  if (!activeId) return;
  if (confirm('Clear all messages?')) {
    chats.find(c=>c.id===activeId).messages = [];
    save(); renderMessages(); renderList(); showToast('Chat cleared 🗑️');
  }
});

document.getElementById('muteBtn').addEventListener('click', function() {
  const chat = chats.find(c=>c.id===activeId);
  chat.muted = !chat.muted; isMuted = chat.muted;
  this.textContent = isMuted ? '🔕' : '🔔';
  save(); renderList(); showToast(isMuted ? 'Chat muted 🔕' : 'Chat unmuted 🔔');
});

document.getElementById('searchInChatBtn').addEventListener('click', () => {
  const q = prompt('Search in this chat:');
  if (!q) return;
  const chat = chats.find(c=>c.id===activeId);
  const found = chat.messages.filter(m=>m.text.toLowerCase().includes(q.toLowerCase()));
  alert(found.length ? `Found ${found.length} message(s):\n` + found.map(m=>m.text).join('\n') : 'No messages found');
});

document.getElementById('darkBtn').addEventListener('click', function() {
  document.body.classList.toggle('dark');
  this.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

document.getElementById('newChatBtn').addEventListener('click', () => {
  const name = prompt('Enter new contact name:');
  if (!name) return;
  const nc = { id: Date.now(), name, avatar: "👤", online: true, isGroup: false, fav: false, unread: 0, muted: false, pinned: false, messages: [{ text: "Hi! 👋", type: "in", time: nowTime() }] };
  chats.unshift(nc); save(); renderList(); openChat(nc.id); showToast('New chat created!');
});

document.getElementById('archivedBtn').addEventListener('click', () => showToast('📦 2 Archived chats (UI Demo)'));
document.getElementById('statusBtn').addEventListener('click', () => {
  document.getElementById('emptyState').classList.add('hidden');
  document.getElementById('activeChat').classList.add('hidden');
  document.getElementById('statusView').classList.remove('hidden');
  document.getElementById('statusList').innerHTML = STATUSES.map(s => `<div class="status-item" onclick="showToast('Viewing ${s.name} status 👀')"><span class="avatar">${s.avatar}</span><div><b>${s.name}</b><br><small>${s.text}</small></div></div>`).join('');
});
function closeStatus() {
  document.getElementById('statusView').classList.add('hidden');
  document.getElementById('emptyState').classList.remove('hidden');
}

if (window.innerWidth <= 768) document.querySelector('.right').classList.add('hide-m');
renderList();