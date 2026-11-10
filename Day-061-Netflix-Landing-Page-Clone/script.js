// Day 61 - Netflix Clone Interactivity
document.querySelectorAll('.faqbox').forEach(box => {
    box.addEventListener('click', () => {
        // Simple toggle effect
        box.style.backgroundColor = box.style.backgroundColor === 'rgb(65, 65, 65)' ? '#2d2d2d' : '#414141';
        console.log(`FAQ Clicked: ${box.firstElementChild.textContent}`);
    });
});

document.querySelector('.btn-red').addEventListener('click', () => {
    const email = document.querySelector('.hero-buttons input').value;
    if (email === '') {
        alert('Please enter your email address');
    } else if (!email.includes('@')) {
        alert('Please enter a valid email');
    } else {
        alert(`Welcome to Netflix! Membership started for ${email}`);
    }
});

// Language toggle
let langBtn = document.querySelector('.btn-lang');
langBtn.addEventListener('click', () => {
    langBtn.textContent = langBtn.textContent.includes('English') ? 'हिन्दी ▼' : 'English ▼';
});