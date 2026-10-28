const video = document.getElementById('video');
const wrapper = document.getElementById('wrapper');
const playBtn = document.getElementById('play');
const bigPlay = document.getElementById('bigPlay');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progressContainer');
const currentEl = document.getElementById('current');
const durationEl = document.getElementById('duration');
const volumeEl = document.getElementById('volume');
const muteBtn = document.getElementById('mute');
const rewindBtn = document.getElementById('rewind');
const forwardBtn = document.getElementById('forward');
const fullscreenBtn = document.getElementById('fullscreen');
const speedBtn = document.getElementById('speed');
const pipBtn = document.getElementById('pip');
const preview = document.getElementById('preview');

let speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
let speedIndex = 2;

function togglePlay() {
  if(video.paused) { video.play(); } else { video.pause(); }
}

function updatePlayIcon() {
  if(video.paused) {
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    bigPlay.innerHTML = '<i class="fas fa-play"></i>';
    wrapper.classList.add('paused');
  } else {
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    bigPlay.innerHTML = '<i class="fas fa-pause"></i>';
    wrapper.classList.remove('paused');
  }
}

function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progress.style.width = percent + '%';
  currentEl.textContent = format(video.currentTime);
  if(video.duration) durationEl.textContent = format(video.duration);
}

function format(s) {
  if(isNaN(s)) return '0:00';
  const m = Math.floor(s/60);
  const sec = Math.floor(s%60).toString().padStart(2,'0');
  return `${m}:${sec}`;
}

function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  video.currentTime = (clickX/width) * video.duration;
}

// Events
video.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);
bigPlay.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('loadedmetadata', () => durationEl.textContent = format(video.duration));

progressContainer.addEventListener('click', setProgress);
progressContainer.addEventListener('mousemove', e => {
  const width = progressContainer.clientWidth;
  const hoverX = e.offsetX;
  const time = (hoverX/width)*video.duration;
  preview.style.display = 'block';
  preview.style.left = hoverX + 'px';
  preview.textContent = format(time);
});
progressContainer.addEventListener('mouseleave', () => preview.style.display = 'none');

rewindBtn.addEventListener('click', () => video.currentTime -= 10);
forwardBtn.addEventListener('click', () => video.currentTime += 10);

volumeEl.addEventListener('input', () => {
  video.volume = volumeEl.value/100;
  muteBtn.innerHTML = video.volume === 0 ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
});

muteBtn.addEventListener('click', () => {
  video.muted = !video.muted;
  muteBtn.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
});

fullscreenBtn.addEventListener('click', () => {
  if(document.fullscreenElement) document.exitFullscreen();
  else wrapper.requestFullscreen();
});

speedBtn.addEventListener('click', () => {
  speedIndex = (speedIndex+1)%speeds.length;
  video.playbackRate = speeds[speedIndex];
  speedBtn.textContent = speeds[speedIndex]+'x';
});

pipBtn.addEventListener('click', async () => {
  try { if(document.pictureInPictureElement) await document.exitPictureInPicture(); else await video.requestPictureInPicture(); } catch(e){}
});

document.addEventListener('keydown', e => {
  if(e.code === 'Space') { e.preventDefault(); togglePlay(); }
  if(e.code === 'ArrowRight') video.currentTime += 5;
  if(e.code === 'ArrowLeft') video.currentTime -= 5;
});

// Playlist
document.querySelectorAll('.vid').forEach(v => {
  v.addEventListener('click', () => {
    video.src = v.dataset.src;
    video.poster = v.dataset.poster;
    video.play();
  });
});