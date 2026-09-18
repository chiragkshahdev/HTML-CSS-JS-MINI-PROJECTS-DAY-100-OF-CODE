// Day 05 - Extra mouse trail glow effect
document.querySelectorAll('.glowing-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        btn.style.setProperty('--x', x + 'px');
        btn.style.setProperty('--y', y + 'px');
    });
});

console.log("Day 05 Glowing Button Loaded");