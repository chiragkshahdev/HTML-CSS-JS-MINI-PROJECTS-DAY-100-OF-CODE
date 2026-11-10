// Follow button interaction
const followBtn = document.querySelector('.follow');
let isFollowing = false;

followBtn.addEventListener('click', () => {
    isFollowing = !isFollowing;
    if(isFollowing){
        followBtn.textContent = "Following";
        followBtn.style.background = "#00f2fe";
        followBtn.style.color = "#000";
    } else {
        followBtn.textContent = "Follow";
        followBtn.style.background = "white";
        followBtn.style.color = "#302b63";
    }
});

// Card tilt effect on mouse move
const card = document.querySelector('.card');
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 20;
    const y = (window.innerHeight / 2 - e.pageY) / 20;
    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

// Reset on mouse leave
document.addEventListener('mouseleave', () => {
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});