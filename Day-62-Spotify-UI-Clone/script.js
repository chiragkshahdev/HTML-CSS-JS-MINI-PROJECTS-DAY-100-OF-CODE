// Day 62 - Spotify Clone Logic
const songs = [
    { name: "Kesariya - Brahmastra", duration: "4:28" },
    { name: "Calm Down - Rema", duration: "3:59" },
    { name: "As It Was - Harry Styles", duration: "2:47" },
    { name: "Perfect - Ed Sheeran", duration: "4:23" },
    { name: "Shivers - Ed Sheeran", duration: "3:27" }
];

let currentIndex = 0;
let isPlaying = false;

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const songinfo = document.querySelector('.songinfo');
const songtime = document.querySelector('.songtime');
const cardContainer = document.getElementById('cardContainer');
const seekbar = document.querySelector('.seekbar');
const circle = document.querySelector('.circle');

// Dynamically load main playlists
songs.forEach((s, i) => {
    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="play"><i class="fa-solid fa-play"></i></div>
        <img src="https://picsum.photos/seed/${i+10}/200/200" alt="">
        <h3>${s.name.split('-')[0]}</h3>
        <p>${s.name}</p>
    `;
    card.addEventListener('click', () => playSong(i));
    cardContainer.appendChild(card);
});

function playSong(index) {
    currentIndex = index;
    songinfo.textContent = songs[currentIndex].name;
    songtime.textContent = `00:00 / ${songs[currentIndex].duration}`;
    isPlaying = true;
    playBtn.className = 'fa-solid fa-circle-pause';
    circle.style.left = '20%';
}

playBtn.addEventListener('click', () => {
    if (songs[currentIndex] && songinfo.textContent !== 'Not Playing') {
        isPlaying = !isPlaying;
        playBtn.className = isPlaying ? 'fa-solid fa-circle-pause' : 'fa-solid fa-circle-play';
    } else {
        playSong(0);
    }
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % songs.length;
    playSong(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(currentIndex);
});

seekbar.addEventListener('click', e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    circle.style.left = percent + '%';
});

// Card play button animation for trending cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        let songName = this.getAttribute('data-song');
        if(songName) {
            songinfo.textContent = songName;
            playBtn.className = 'fa-solid fa-circle-pause';
            isPlaying = true;
        }
    });
});