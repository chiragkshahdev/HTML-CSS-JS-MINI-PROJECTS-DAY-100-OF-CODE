const users = [
  { id: 1, name: "yourstory", avatar: "https://i.pravatar.cc/150?img=1", seen: false, stories: [{ img: "https://picsum.photos/id/1015/500/900", caption: "Morning vibes ☀️" }] },
  { id: 2, name: "arijit.design", avatar: "https://i.pravatar.cc/150?img=8", seen: false, stories: [{ img: "https://picsum.photos/id/1018/500/900", caption: "New workspace setup" }, { img: "https://picsum.photos/id/1025/500/900", caption: "Details matter ✨" }] },
  { id: 3, name: "priya.codes", avatar: "https://i.pravatar.cc/150?img=5", seen: false, stories: [{ img: "https://picsum.photos/id/1035/500/900", caption: "Coding late night 💻" }] },
  { id: 4, name: "travelwithak", avatar: "https://i.pravatar.cc/150?img=12", seen: false, stories: [{ img: "https://picsum.photos/id/1040/500/900", caption: "Himalayas calling 🏔️" }, { img: "https://picsum.photos/id/1043/500/900", caption: "Lost in mountains" }, { img: "https://picsum.photos/id/1050/500/900", caption: "Sunset point" }] },
  { id: 5, name: "foodie.sam", avatar: "https://i.pravatar.cc/150?img=20", seen: true, stories: [{ img: "https://picsum.photos/id/1080/500/900", caption: "Best biryani ever!" }] },
  { id: 6, name: "neon.ui", avatar: "https://i.pravatar.cc/150?img=32", seen: true, stories: [{ img: "https://picsum.photos/id/1060/500/900", caption: "Day 65 build 🔥" }] },
];

const bar = document.getElementById('storiesBar');
const viewer = document.getElementById('viewer');
const progressContainer = document.getElementById('progressContainer');
const viewerAvatar = document.getElementById('viewerAvatar');
const viewerName = document.getElementById('viewerName');
const storyImage = document.getElementById('storyImage');
const storyCaption = document.getElementById('storyCaption');

let currentUserIndex = 0;
let currentStoryIndex = 0;
let timer = null;
let isPaused = false;

function renderBar() {
  bar.innerHTML = '';
  users.forEach((u, idx) => {
    const el = document.createElement('div');
    el.className = `story-ring ${u.seen ? 'seen' : ''}`;
    el.innerHTML = `
      <div class="ring ${u.seen ? 'seen' : ''}">
        <div class="ring-inner"><img src="${u.avatar}"></div>
      </div>
      <span>${u.name}</span>
    `;
    el.onclick = () => openViewer(idx);
    bar.appendChild(el);
  });
}

function openViewer(userIdx, storyIdx = 0) {
  currentUserIndex = userIdx;
  currentStoryIndex = storyIdx;
  viewer.classList.add('active');
  showStory();
}

function showStory() {
  const user = users[currentUserIndex];
  const story = user.stories[currentStoryIndex];
  
  viewerAvatar.src = user.avatar;
  viewerName.textContent = user.name;
  storyImage.src = story.img;
  storyCaption.textContent = story.caption;

  // progress bars
  progressContainer.innerHTML = '';
  user.stories.forEach((_, i) => {
    const bar = document.createElement('div');
    bar.className = `progress-bar ${i < currentStoryIndex ? 'done' : i === currentStoryIndex ? 'active' : ''}`;
    bar.innerHTML = `<div class="progress-fill" style="${i < currentStoryIndex ? 'width:100%' : i === currentStoryIndex ? '' : 'width:0%'}"></div>`;
    progressContainer.appendChild(bar);
  });

  // trigger animation
  requestAnimationFrame(() => {
    const active = progressContainer.querySelector('.progress-bar.active .progress-fill');
    if(active) {
      active.style.width = '0%';
      setTimeout(() => active.style.width = '100%', 50);
    }
  });

  clearTimeout(timer);
  if(!isPaused) {
    timer = setTimeout(nextStory, 5000);
  }

  // mark seen after first view
  user.seen = true;
  renderBar();
}

function nextStory() {
  const user = users[currentUserIndex];
  if (currentStoryIndex < user.stories.length - 1) {
    currentStoryIndex++;
    showStory();
  } else {
    if (currentUserIndex < users.length - 1) {
      currentUserIndex++;
      currentStoryIndex = 0;
      showStory();
    } else {
      closeViewer();
    }
  }
}

function prevStory() {
  if (currentStoryIndex > 0) {
    currentStoryIndex--;
    showStory();
  } else if (currentUserIndex > 0) {
    currentUserIndex--;
    currentStoryIndex = users[currentUserIndex].stories.length - 1;
    showStory();
  }
}

function closeViewer() {
  viewer.classList.remove('active');
  clearTimeout(timer);
}

// Controls
document.getElementById('nextZone').onclick = nextStory;
document.getElementById('prevZone').onclick = prevStory;
document.getElementById('closeBtn').onclick = closeViewer;

// Hold to pause
let holdTimer;
viewer.addEventListener('mousedown', () => {
  isPaused = true;
  const fill = progressContainer.querySelector('.progress-bar.active .progress-fill');
  if(fill) fill.style.animationPlayState = 'paused';
  const computed = window.getComputedStyle(fill).width;
  fill.style.width = computed;
  clearTimeout(timer);
});
viewer.addEventListener('mouseup', () => {
  isPaused = false;
  timer = setTimeout(nextStory, 2000);
});
viewer.addEventListener('touchstart', () => { isPaused = true; clearTimeout(timer); });
viewer.addEventListener('touchend', () => { isPaused = false; timer = setTimeout(nextStory, 2000); });

document.addEventListener('keydown', (e) => {
  if(!viewer.classList.contains('active')) return;
  if(e.key === 'ArrowRight') nextStory();
  if(e.key === 'ArrowLeft') prevStory();
  if(e.key === 'Escape') closeViewer();
});

renderBar();