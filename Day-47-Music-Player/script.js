const songs = [
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Save Your Tears",
    artist: "The Weeknd",
    cover: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    title: "Stay",
    artist: "Kid LAROI & Bieber",
    cover: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=400",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  }
];

const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progressBar');
const currentEl = document.getElementById('current');
const durationEl = document.getElementById('duration');
const volumeEl = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const player = document.querySelector('.player');

let index = 0;
let isShuffle = false;
let isRepeat = false;

function loadSong(i) {
  const song = songs[i];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  renderPlaylist();
}

function renderPlaylist() {
  playlistEl.innerHTML = songs.map((s, i) => `
    <div class="playlist-item ${i===index?'active':''}" onclick="playIndex(${i})">
      <img src="${s.cover}">
      <div><h4>${s.title}</h4><p>${s.artist}</p></div>
      ${i===index?'<i class="fas fa-music"></i>':''}
    </div>
  `).join('');
}

function playPause() {
  if(audio.paused) {
    audio.play();
    player.classList.add('playing');
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    player.classList.remove('playing');
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function next() {
  if(isShuffle) index = Math.floor(Math.random()*songs.length);
  else index = (index+1)%songs.length;
  loadSong(index); audio.play();
  player.classList.add('playing'); playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}
function prev() {
  index = (index-1+songs.length)%songs.length;
  loadSong(index); audio.play();
}

window.playIndex = (i) => { index=i; loadSong(index); audio.play(); player.classList.add('playing'); playBtn.innerHTML='<i class="fas fa-pause"></i>'; };

audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100 || 0;
  progress.style.width = percent + '%';
  currentEl.textContent = format(audio.currentTime);
  if(audio.duration) durationEl.textContent = format(audio.duration);
});

function format(s) {
  if(isNaN(s)) return '0:00';
  const m = Math.floor(s/60); const sec = Math.floor(s%60).toString().padStart(2,'0');
  return `${m}:${sec}`;
}

progressBar.addEventListener('click', e => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX/width)*audio.duration;
});

volumeEl.addEventListener('input', () => audio.volume = volumeEl.value/100);

playBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);

shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle; shuffleBtn.classList.toggle('active', isShuffle);
});
repeatBtn.addEventListener('click', () => {
  isRepeat = !isRepeat; repeatBtn.classList.toggle('active', isRepeat);
  audio.loop = isRepeat;
});

audio.addEventListener('ended', () => { if(!isRepeat) next(); });

// Init
loadSong(index);
audio.volume = 0.8;