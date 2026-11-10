// --- INITIAL DATA ---
const DEFAULT_COMMENTS = {
  1: [
    { id: 1, user: "rahul_verma", text: "Wow! Amazing view 😍", likes: 12, liked: false },
    { id: 2, user: "travel_diaries", text: "Which place is this?", likes: 5, liked: false },
    { id: 3, user: "priya_sharma", text: "Manali guys! Must visit ❤️", likes: 18, liked: false },
  ],
  2: [
    { id: 4, user: "you_dev", text: "Mouth watering 🤤", likes: 3, liked: false },
    { id: 5, user: "foodie_virar", text: "Come fast, last slice left!", likes: 7, liked: false },
  ]
};

const DEFAULT_LIKES = { 1: 1234, 2: 892 };

// --- STATE (localStorage) ---
let state = JSON.parse(localStorage.getItem('insta_day68')) || null;
if (!state) {
  state = {
    comments: JSON.parse(JSON.stringify(DEFAULT_COMMENTS)),
    likes: { ...DEFAULT_LIKES },
    likedPosts: {},
    savedPosts: {},
    followed: {}
  };
  save();
}
function save() { localStorage.setItem('insta_day68', JSON.stringify(state)); }

let commentId = Date.now();
const ME = "you_dev";

// --- HELPERS ---
function fmt(n) { return n.toLocaleString('en-IN'); }
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}
function updateStats() {
  const totalLikes = Object.values(state.likes).reduce((a,b)=>a+b,0);
  const totalComments = Object.values(state.comments).flat().length;
  document.getElementById('totalLikes').textContent = fmt(totalLikes);
  document.getElementById('totalComments').textContent = totalComments;
}

// --- RENDER ALL POSTS ---
document.querySelectorAll('.post').forEach(postEl => {
  const postId = postEl.dataset.postId;
  const likeBtn = postEl.querySelector('.like-btn');
  const likeNum = postEl.querySelector('.like-num');
  const commentsList = postEl.querySelector('.comments-list');
  const commentCountEl = postEl.querySelector('.comment-count');
  const input = postEl.querySelector('.comment-input');
  const postBtn = postEl.querySelector('.post-comment-btn');
  const saveBtn = postEl.querySelector('.save-btn');
  const followBtn = postEl.querySelector('[data-follow]');
  const imgWrap = postEl.querySelector('.post-img-wrap');
  const bigHeart = postEl.querySelector('.big-heart');

  // Restore UI from state
  likeNum.textContent = fmt(state.likes[postId] || 0);
  if (state.likedPosts[postId]) likeBtn.textContent = '❤️';
  if (state.likedPosts[postId]) likeBtn.classList.add('liked');
  if (state.savedPosts[postId]) saveBtn.textContent = '🔖 Saved';
  if (state.followed[postId]) { followBtn.textContent = 'Following'; followBtn.classList.add('following'); }

  function renderComments() {
    const list = state.comments[postId] || [];
    commentCountEl.textContent = list.length;
    commentsList.innerHTML = list.map(c => `
      <div class="comment-item">
        <b>${c.user}</b><span>${c.text}</span>
        <div class="c-actions">
          <button class="c-like ${c.liked ? 'liked' : ''}" data-cid="${c.id}">${c.liked ? '❤️' : '🤍'} ${c.likes}</button>
          <button class="c-del" data-cid="${c.id}">✕</button>
        </div>
      </div>
    `).join('');

    // Comment like / delete listeners
    commentsList.querySelectorAll('.c-like').forEach(btn => {
      btn.addEventListener('click', () => {
        const c = list.find(x => x.id == btn.dataset.cid);
        c.liked = !c.liked;
        c.likes += c.liked ? 1 : -1;
        save(); renderComments(); updateStats();
      });
    });
    commentsList.querySelectorAll('.c-del').forEach(btn => {
      btn.addEventListener('click', () => {
        state.comments[postId] = list.filter(x => x.id != btn.dataset.cid);
        save(); renderComments(); updateStats();
        showToast('Comment deleted');
      });
    });
  }
  renderComments();

  // Toggle Like
  function toggleLike() {
    const isLiked = !state.likedPosts[postId];
    state.likedPosts[postId] = isLiked;
    state.likes[postId] += isLiked ? 1 : -1;
    likeBtn.textContent = isLiked ? '❤️' : '🤍';
    likeBtn.classList.remove('liked'); void likeBtn.offsetWidth; likeBtn.classList.add('liked');
    likeNum.textContent = fmt(state.likes[postId]);
    save(); updateStats();
    if (isLiked) showToast('Liked ❤️');
  }
  likeBtn.addEventListener('click', toggleLike);

  // Double-tap Like
  let lastTap = 0;
  imgWrap.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      if (!state.likedPosts[postId]) toggleLike();
      bigHeart.classList.add('show');
      setTimeout(() => bigHeart.classList.remove('show'), 600);
    }
    lastTap = now;
  });

  // Comment Input Enable
  input.addEventListener('input', () => postBtn.disabled = input.value.trim() === '');
  input.addEventListener('keydown', e => { if (e.key === 'Enter' && !postBtn.disabled) postBtn.click(); });

  // Post Comment
  postBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    state.comments[postId].push({ id: ++commentId, user: ME, text, likes: 0, liked: false });
    input.value = ''; postBtn.disabled = true;
    save(); renderComments(); updateStats();
    showToast('Comment posted 💬');
  });

  // Focus comment on 💬 click
  postEl.querySelector('.comment-focus').addEventListener('click', () => input.focus());

  // Share
  postEl.querySelector('.share-btn').addEventListener('click', () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link copied! Share sent ✈️');
  });

  // Save
  saveBtn.addEventListener('click', () => {
    state.savedPosts[postId] = !state.savedPosts[postId];
    saveBtn.textContent = state.savedPosts[postId] ? '🔖 Saved' : '🔖';
    save();
    showToast(state.savedPosts[postId] ? 'Saved to collection 🔖' : 'Removed from saved');
  });

  // Follow
  followBtn.addEventListener('click', () => {
    state.followed[postId] = !state.followed[postId];
    followBtn.textContent = state.followed[postId] ? 'Following' : 'Follow';
    followBtn.classList.toggle('following', state.followed[postId]);
    save();
    showToast(state.followed[postId] ? 'Following ✅' : 'Unfollowed');
  });
});

// Sidebar follow buttons
document.querySelectorAll('.suggest button').forEach(b => {
  b.addEventListener('click', () => {
    b.textContent = b.textContent === 'Follow' ? 'Following' : 'Follow';
    showToast(b.textContent === 'Following' ? 'Following ✅' : 'Unfollowed');
  });
});

document.getElementById('resetBtn').addEventListener('click', () => {
  localStorage.removeItem('insta_day68');
  location.reload();
});

updateStats();