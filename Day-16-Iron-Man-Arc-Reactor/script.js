const reactor = document.querySelector('.reactor');
const status = document.getElementById('status');

let isActive = true;

status.addEventListener('click', () => {
    if(isActive){
        reactor.style.animation = 'none';
        reactor.style.boxShadow = '0 0 10px #333';
        reactor.style.background = '#111';
        status.innerText = 'POWER OFF - CLICK TO START';
        status.style.color = '#555';
        isActive = false;
    } else {
        reactor.style.animation = 'pulse 1.5s infinite alternate';
        reactor.style.boxShadow = '0 0 50px #00f2ff, 0 0 100px #00f2ff';
        reactor.style.background = '#00f2ff';
        status.innerText = 'JARVIS ONLINE';
        status.style.color = '#00f2ff';
        isActive = true;
    }
});