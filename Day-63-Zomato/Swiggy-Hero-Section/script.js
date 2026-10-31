// Day 63 - Zomato/Swiggy Hero Logic
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const trendingBtns = document.querySelectorAll('.trending button');

searchBtn.addEventListener('click', () => {
    let query = searchInput.value.trim();
    if (query === '') {
        alert('Please enter a restaurant or dish');
    } else {
        alert(`Searching for "${query}" in Virar... 🍔`);
        // In real app: window.location.href = `/search?q=${query}`
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});

trendingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        searchInput.value = btn.textContent;
        searchBtn.click();
    });
});

// Auto suggestion simulation
const suggestions = ['Biryani', 'Chicken Pizza', 'Veg Burger', 'Paneer Momos', 'Pasta', 'Dosa'];
searchInput.addEventListener('input', () => {
    if (searchInput.value.length === 2) {
        console.log('Suggesting:', suggestions.filter(s => s.toLowerCase().includes(searchInput.value.toLowerCase())));
    }
});

// Card click
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        let type = card.querySelector('h3').textContent;
        alert(`Opening ${type} section`);
    });
});