const DEFAULT_POSTS = [
  { id: 1, user: "Priya Sharma", avatar: "🌸", time: "2 hrs ago • 🌍", text: "Best trip ever! 🏔️ Manali me snowfall dekh ke maza aa gaya! Kon kon chalega next time?", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", likes: 234, liked: false, saved: false, shares: 12, comments: [
    { id: 101, user: "Rahul Verma", text: "Wow! Amazing view 😍", likes: 5, liked: false },
    { id: 102, user: "Sneha", text: "Mujhe bhi le chalo next time!", likes: 3, liked: false },
  ]},
  { id: 2, user: "Foodie Virar 🍕", avatar: "🍕", time: "4 hrs ago • 📍 Virar West", text: "Virar ka sabse best pizza! 🍕 Buy 1 Get 1 Free offer chal raha hai. Tag your pizza partner!", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80", likes: 189, liked: false, saved: false, shares: 23, comments: [
    { id: 201, user: "You Dev", text: "Mouth watering 🤤", likes: 2, liked: false },
  ]},
  { id: 3, user: "Aman Code", avatar: "💻", time: "6 hrs ago • 🌍", text: "Day-71 complete! Facebook Post Clone bana diya 💻🔥 100 Days of Code me 71 days done! Konsa project sabse best laga?", img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80", likes: 456, liked: false, saved: false, shares: 45, comments: [
    { id: 301, user: "Priya Sharma", text: "WhatsApp clone was best! 🔥", likes: 12, liked: false },
    { id: 302, user: "Rahul Verma", text: "Keep it up bro 💪", likes: 8, liked: false },
  ]},
];

const CONTACTS = [
  { name: "Priya Sharma", avatar: "🌸", online: true },
  { name: "Rahul Verma", avatar: "🔥", online: true },
  { name: "Sneha Patel", avatar: "✈️", online: true },
  { name: "Aman Code", avatar: "💻", online: false },
  { name: "Mummy ❤️", avatar: "❤️", online: false },
];

let posts = JSON.parse(localStorage.getItem('fb_day71')) || JSON.parse(JSON.stringify(DEFAULT_POSTS));
let filter = 'all';
let sharePostId = null;
let commentId = Date.now();

function save() { localStorage.setItem('fb_day71', JSON.stringify(posts)); }
function showToast(m) { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 1800); }

function renderPosts() {
  const container = document.getElementById('postsContainer');
  let list = posts.filter(p => {
    if (filter === 'liked' && !p.liked) return false;
    if (filter === 'saved' && !p.saved) return false;
    return true;
  });

  if (list.length === 0) container.innerHTML = `<p style="text-align:center;padding:30px;background:#fff;border-radius:12px;color:#888">No posts found</p>`;
  else container.innerHTML = list.map(p => `
    <article class="post" data-id="${p.id}">
      <div class="post-head"><span class="avatar">${p.avatar}</span><div><b>${p.user}</b><small>${p.time}</small></div><span class="dots">⋯</span></div>
      <p class="post-text">${p.text}</p>
      ${p.img ? `<img src="${p.img}" class="post-img" onclick="likePost(${p.id})" />` : ''}
      <div class="reactions-bar"><span>👍❤️😮 <b>${p.likes}</b> likes</span><span>${p.comments.length} comments • ${p.shares} shares</span></div>
      <div class="action-bar">
        <button class="${p.liked?'liked':''}" onclick="likePost(${p.id})">${p.liked?'👍 Liked':'👍 Like'}</button>
        <button onclick="focusComment(${p.id})">💬 Comment</button>
        <button onclick="openShare(${p.id})">↗️ Share</button>
        <button class="${p.saved?'saved':''}" onclick="savePost(${p.id})">${p.saved?'🔖 Saved':'🔖 Save'}</button>
      </div>
      <div class="comments">
        ${p.comments.map(c => `
          <div class="comment"><span class="avatar" style="width:32px;height:32px;font-size:14px">👤</span>
            <div style="flex:1"><div class="comment-bubble"><b>${c.user}</b>${c.text}</div>
            <div class="comment-actions"><button class="${c.liked?'liked':''}" onclick="likeComment(${p.id},${c.id})">${c.liked?'👍 Liked':'Like'} (${c.likes})</button><button>Reply</button><button onclick="deleteComment(${p.id},${c.id})">Delete</button></div></div>
          </div>`).join('')}
      </div>
      <div class="add-comment"><span class="avatar" style="width:32px;height:32px;font-size:14px">😎</span><input type="text" id="input-${p.id}" placeholder="Write a comment..." oninput="togglePostBtn(${p.id})" onkeydown="if(event.key==='Enter') addComment(${p.id})" /><button id="btn-${p.id}" disabled onclick="addComment(${p.id})">Post</button></div>
    </article>`).join('');

  const totalLikes = posts.reduce((s,p)=>s+p.likes,0);
  const totalComments = posts.reduce((s,p)=>s+p.comments.length,0);
  const totalShares = posts.reduce((s,p)=>s+p.shares,0);
  document.getElementById('totalLikes').textContent = totalLikes.toLocaleString('en-IN');
  document.getElementById('totalComments').textContent = totalComments;
  document.getElementById('totalShares').textContent = totalShares;
}

function likePost(id) {
  const p = posts.find(x=>x.id===id);
  p.liked = !p.liked; p.likes += p.liked ? 1 : -1;
  save(); renderPosts();
  if (p.liked) showToast('Liked 👍');
}
function savePost(id) {
  const p = posts.find(x=>x.id===id);
  p.saved = !p.saved; save(); renderPosts();
  showToast(p.saved ? 'Saved 🔖' : 'Unsaved');
}
function focusComment(id) { document.getElementById(`input-${id}`).focus(); }
function togglePostBtn(id) {
  const input = document.getElementById(`input-${id}`);
  document.getElementById(`btn-${id}`).disabled = input.value.trim() === '';
}
function addComment(postId) {
  const input = document.getElementById(`input-${postId}`);
  const text = input.value.trim();
  if (!text) return;
  const p = posts.find(x=>x.id===postId);
  p.comments.push({ id: ++commentId, user: "You Dev", text, likes: 0, liked: false });
  save(); renderPosts(); showToast('Comment posted 💬');
}
function likeComment(postId, commentId) {
  const p = posts.find(x=>x.id===postId);
  const c = p.comments.find(x=>x.id===commentId);
  c.liked = !c.liked; c.likes += c.liked ? 1 : -1;
  save(); renderPosts();
}
function deleteComment(postId, commentId) {
  const p = posts.find(x=>x.id===postId);
  p.comments = p.comments.filter(x=>x.id!==commentId);
  save(); renderPosts(); showToast('Comment deleted');
}

function openShare(id) {
  sharePostId = id;
  const p = posts.find(x=>x.id===id);
  document.getElementById('shareText').textContent = `"${p.text.slice(0,80)}..." - by ${p.user}`;
  document.getElementById('shareModal').classList.remove('hidden');
}
function closeShare() { document.getElementById('shareModal').classList.add('hidden'); }
function confirmShare() {
  const p = posts.find(x=>x.id===sharePostId);
  p.shares++; save(); renderPosts(); closeShare();
  showToast('Post shared ↗️');
}

// Create New Post
function createPost(type) { showToast(`${type} - Feature demo`); }
document.getElementById('publishBtn').addEventListener('click', publishPost);
document.getElementById('newPostInput').addEventListener('keydown', e => { if (e.key==='Enter') publishPost(); });
function publishPost() {
  const input = document.getElementById('newPostInput');
  const text = input.value.trim();
  if (!text) return alert('Please write something!');
  posts.unshift({ id: Date.now(), user: "You Dev", avatar: "😎", time: "Just now • 🌍", text, img: "", likes: 0, liked: false, saved: false, shares: 0, comments: [] });
  input.value = ''; save(); renderPosts(); showToast('Post published! 🎉');
}

document.querySelectorAll('.filter').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));
  b.classList.add('active'); filter = b.dataset.filter; renderPosts();
}));

document.getElementById('topSearch').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  if (!q) { renderPosts(); return; }
  const filtered = posts.filter(p => p.text.toLowerCase().includes(q) || p.user.toLowerCase().includes(q));
  const container = document.getElementById('postsContainer');
  if (filtered.length===0) container.innerHTML = `<p style="text-align:center;padding:20px;background:#fff;border-radius:12px">No results for "${e.target.value}"</p>`;
  else {
    // temporarily render filtered without changing filter
    const old = filter; filter = 'all'; renderPosts();
    document.getElementById('postsContainer').innerHTML = document.getElementById('postsContainer').innerHTML; // keep simple
  }
});

document.getElementById('contactsList').innerHTML = CONTACTS.map(c => `<div class="contact" onclick="showToast('Opening chat with ${c.name} 💬')"><span class="avatar" style="width:36px;height:36px">${c.avatar}</span><b>${c.name}</b>${c.online?'<span class="dot"></span>':''}</div>`).join('');

document.getElementById('resetBtn').addEventListener('click', () => {
  localStorage.removeItem('fb_day71');
  location.reload();
});

renderPosts();