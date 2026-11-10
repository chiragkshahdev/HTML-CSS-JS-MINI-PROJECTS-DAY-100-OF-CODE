const logo = document.getElementById('logo');
const btn = document.getElementById('assembleBtn');
const title = document.getElementById('title');

function assemble() {
    logo.classList.add('assemble');
    title.innerText = "AVENGERS ASSEMBLED";
    title.style.color = "#ff0000";
    btn.innerText = "DISASSEMBLE";
    
    // Haptic + Sound effect feel
    document.body.style.animation = "shake 0.3s";
    setTimeout(() => {
        document.body.style.animation = "none";
    }, 300);
}

function disassemble() {
    logo.classList.remove('assemble');
    title.innerText = "AVENGERS";
    title.style.color = "#fff";
    btn.innerText = "ASSEMBLE";
}

btn.addEventListener('click', () => {
    if(logo.classList.contains('assemble')){
        disassemble();
    } else {
        assemble();
    }
});

logo.addEventListener('click', () => {
    btn.click();
});

// Extra shake effect
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
@keyframes shake {
  0% { transform: translate(1px, 1px) }
  50% { transform: translate(-1px, -2px) }
  100% { transform: translate(0, 0) }
}`;
document.head.appendChild(styleSheet);