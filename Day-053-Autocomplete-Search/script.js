const searchInput = document.getElementById('search');
const resultBox = document.getElementById('resultBox');

const keywords = [
    "India", "Indonesia", "Iran", "Iraq", "Ireland", "Italy",
    "Japan", "Jamaica", "Jordan",
    "United States", "United Kingdom", "UAE", "Ukraine",
    "Australia", "Austria", "Afghanistan",
    "Canada", "China", "Chile", "Colombia",
    "Germany", "Greece", "Georgia",
    "Brazil", "Belgium", "Bangladesh"
];

searchInput.addEventListener('keyup', () => {
    let input = searchInput.value.toLowerCase();
    resultBox.innerHTML = '';

    if (input.length) {
        let filtered = keywords.filter(k => k.toLowerCase().includes(input));
        
        if (filtered.length) {
            const ul = document.createElement('ul');
            filtered.forEach(word => {
                const li = document.createElement('li');
                li.textContent = word;
                li.onclick = () => {
                    searchInput.value = word;
                    resultBox.innerHTML = '';
                };
                ul.appendChild(li);
            });
            resultBox.appendChild(ul);
        }
    }
});

// Close on click outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
        resultBox.innerHTML = '';
    }
});