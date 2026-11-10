// ALL 99 PROJECTS DATA
const allProjects = [
  // BASIC 1-30
  { day: 1, title: "Hello World Website", emoji: "👋", desc: "My first website. Started my coding journey.", type: "basic", tech: "HTML" },
  { day: 2, title: "My Bio Page", emoji: "👤", desc: "About me page with photo and hobbies.", type: "basic", tech: "HTML CSS" },
  { day: 3, title: "Favourite Food List", emoji: "🍕", desc: "List of my favourite foods with images.", type: "basic", tech: "HTML" },
  { day: 4, title: "My Time Table", emoji: "📅", desc: "College timetable in table format.", type: "basic", tech: "HTML" },
  { day: 5, title: "Simple Form", emoji: "📝", desc: "Admission form with inputs and validation.", type: "basic", tech: "HTML" },
  { day: 6, title: "Color Changer", emoji: "🎨", desc: "Click button, background color changes.", type: "basic", tech: "JS" },
  { day: 7, title: "Calculator", emoji: "🧮", desc: "Simple calculator - Add, Subtract, Multiply, Divide.", type: "basic", tech: "JS" },
  { day: 8, title: "Counter App", emoji: "🔢", desc: "Increase, Decrease, Reset counter.", type: "basic", tech: "JS" },
  { day: 9, title: "Age Calculator", emoji: "🎂", desc: "Enter birth date, get age instantly.", type: "basic", tech: "JS" },
  { day: 10, title: "BMI Calculator", emoji: "⚖️", desc: "Calculate BMI with height and weight.", type: "basic", tech: "JS" },
  { day: 11, title: "To-Do List", emoji: "✅", desc: "Add, delete, complete tasks.", type: "basic", tech: "JS" },
  { day: 12, title: "Digital Clock", emoji: "🕐", desc: "Live clock with date and time.", type: "basic", tech: "JS" },
  { day: 13, title: "Stopwatch", emoji: "⏱️", desc: "Start, stop, reset stopwatch.", type: "basic", tech: "JS" },
  { day: 14, title: "Quiz App", emoji: "❓", desc: "5 questions quiz with score.", type: "basic", tech: "JS" },
  { day: 15, title: "Rock Paper Scissors", emoji: "✂️", desc: "Play vs computer game.", type: "basic", tech: "Game" },
  { day: 16, title: "Dice Roller", emoji: "🎲", desc: "Random dice roll animation.", type: "basic", tech: "JS" },
  { day: 17, title: "Random Quote Generator", emoji: "💬", desc: "New quote on every click.", type: "basic", tech: "JS" },
  { day: 18, title: "Password Generator", emoji: "🔑", desc: "Strong password generator.", type: "basic", tech: "JS" },
  { day: 19, title: "Tip Calculator", emoji: "💰", desc: "Calculate tip and bill split.", type: "basic", tech: "JS" },
  { day: 20, title: "Temperature Converter", emoji: "🌡️", desc: "Celsius to Fahrenheit converter.", type: "basic", tech: "JS" },
  { day: 21, title: "Image Gallery", emoji: "🖼️", desc: "Photo gallery with hover effect.", type: "basic", tech: "CSS" },
  { day: 22, title: "Landing Page", emoji: "🚀", desc: "First landing page for a product.", type: "basic", tech: "HTML CSS" },
  { day: 23, title: "Navbar Designs", emoji: "🧭", desc: "5 different navbar styles.", type: "basic", tech: "CSS" },
  { day: 24, title: "Login Page UI", emoji: "🔐", desc: "Beautiful login and signup UI.", type: "basic", tech: "CSS" },
  { day: 25, title: "Pricing Card", emoji: "💳", desc: "3 pricing plans UI.", type: "basic", tech: "CSS" },
  { day: 26, title: "Profile Card", emoji: "💳", desc: "Profile card with social links.", type: "basic", tech: "CSS" },
  { day: 27, title: "Weather UI", emoji: "🌦️", desc: "Weather app UI design.", type: "basic", tech: "CSS" },
  { day: 28, title: "Music Player UI", emoji: "🎵", desc: "Music player front design.", type: "basic", tech: "CSS" },
  { day: 29, title: "E-Commerce Card", emoji: "🛒", desc: "Product card with add to cart.", type: "basic", tech: "JS" },
  { day: 30, title: "Portfolio V1", emoji: "💼", desc: "First portfolio website.", type: "basic", tech: "HTML CSS" },

  // INTERMEDIATE 31-60
  { day: 31, title: "Expense Tracker", emoji: "💸", desc: "Track daily expenses.", type: "intermediate", tech: "JS" },
  { day: 32, title: "Notes App", emoji: "📓", desc: "Save notes in browser.", type: "intermediate", tech: "JS" },
  { day: 33, title: "Memory Game", emoji: "🧠", desc: "Flip cards memory game.", type: "intermediate", tech: "Game" },
  { day: 34, title: "Tic Tac Toe", emoji: "❌", desc: "2 player Tic Tac Toe game.", type: "intermediate", tech: "Game" },
  { day: 35, title: "Snake Game", emoji: "🐍", desc: "Classic snake game.", type: "intermediate", tech: "Game" },
  { day: 36, title: "Meme Generator", emoji: "😂", desc: "Random meme generator.", type: "intermediate", tech: "JS" },
  { day: 37, title: "Joke App", emoji: "🤣", desc: "Random jokes app.", type: "intermediate", tech: "JS" },
  { day: 38, title: "Search Filter", emoji: "🔍", desc: "Live search filter list.", type: "intermediate", tech: "JS" },
  { day: 39, title: "Dark Mode Toggle", emoji: "🌙", desc: "Dark light mode website.", type: "intermediate", tech: "JS" },
  { day: 40, title: "Blog Website", emoji: "✍️", desc: "Blog with 5 articles.", type: "intermediate", tech: "HTML CSS" },
  { day: 41, title: "Restaurant Menu", emoji: "🍔", desc: "Restaurant menu with filter.", type: "intermediate", tech: "JS" },
  { day: 42, title: "Movie Search UI", emoji: "🎬", desc: "Search movies UI.", type: "intermediate", tech: "JS" },
  { day: 43, title: "Weather App", emoji: "☀️", desc: "Weather app with fake data.", type: "intermediate", tech: "JS" },
  { day: 44, title: "Currency Converter", emoji: "💱", desc: "USD to INR converter.", type: "intermediate", tech: "JS" },
  { day: 45, title: "Gym Website", emoji: "🏋️", desc: "Gym landing page.", type: "intermediate", tech: "HTML CSS" },
  { day: 46, title: "School Website", emoji: "🏫", desc: "School website with pages.", type: "intermediate", tech: "HTML CSS" },
  { day: 47, title: "Travel Website", emoji: "✈️", desc: "Travel booking UI.", type: "intermediate", tech: "HTML CSS" },
  { day: 48, title: "Hospital Website", emoji: "🏥", desc: "Hospital appointment UI.", type: "intermediate", tech: "HTML CSS" },
  { day: 49, title: "E-Commerce Home", emoji: "🛍️", desc: "Full shop homepage.", type: "intermediate", tech: "HTML CSS" },
  { day: 50, title: "50 Days Celebration", emoji: "🎉", desc: "Half journey celebration page.", type: "intermediate", tech: "HTML CSS" },
  { day: 51, title: "Typing Speed Test", emoji: "⌨️", desc: "Test your typing speed.", type: "intermediate", tech: "JS" },
  { day: 52, title: "Drum Kit", emoji: "🥁", desc: "Play drums with keyboard.", type: "intermediate", tech: "JS" },
  { day: 53, title: "Piano App", emoji: "🎹", desc: "Play piano in browser.", type: "intermediate", tech: "JS" },
  { day: 54, title: "Drawing App", emoji: "✏️", desc: "Draw anything with mouse.", type: "intermediate", tech: "JS" },
  { day: 55, title: "Countdown Timer", emoji: "⏳", desc: "Countdown to exam / new year.", type: "intermediate", tech: "JS" },
  { day: 56, title: "Pomodoro Timer", emoji: "🍅", desc: "Focus timer 25 min.", type: "intermediate", tech: "JS" },
  { day: 57, title: "Habit Tracker", emoji: "📈", desc: "Track daily habits.", type: "intermediate", tech: "JS" },
  { day: 58, title: "Budget App", emoji: "📊", desc: "Monthly budget planner.", type: "intermediate", tech: "JS" },
  { day: 59, title: "Flashcards App", emoji: "🃏", desc: "Study flashcards for BSCIT.", type: "intermediate", tech: "JS" },
  { day: 60, title: "Resume Builder", emoji: "📄", desc: "Make resume by filling form.", type: "intermediate", tech: "JS" },

  // CLONES 61-95
  { day: 61, title: "Google Clone", emoji: "🔎", desc: "Google homepage clone.", type: "clone", tech: "Clone" },
  { day: 62, title: "Facebook Login Clone", emoji: "📘", desc: "Facebook login page clone.", type: "clone", tech: "Clone" },
  { day: 63, title: "Instagram Login Clone", emoji: "📸", desc: "Instagram login UI clone.", type: "clone", tech: "Clone" },
  { day: 64, title: "Netflix Clone UI", emoji: "🎬", desc: "Netflix homepage clone.", type: "clone", tech: "Clone" },
  { day: 65, title: "Spotify Clone UI", emoji: "🎧", desc: "Spotify music UI clone.", type: "clone", tech: "Clone" },
  { day: 66, title: "Amazon Clone UI", emoji: "📦", desc: "Amazon homepage clone.", type: "clone", tech: "Clone" },
  { day: 67, title: "Flipkart Clone UI", emoji: "🛒", desc: "Flipkart homepage clone.", type: "clone", tech: "Clone" },
  { day: 68, title: "WhatsApp Clone UI", emoji: "💬", desc: "WhatsApp chat UI clone.", type: "clone", tech: "Clone" },
  { day: 69, title: "Telegram Clone UI", emoji: "✈️", desc: "Telegram chat UI.", type: "clone", tech: "Clone" },
  { day: 70, title: "Twitter / X Clone", emoji: "🐦", desc: "Twitter feed clone.", type: "clone", tech: "Clone" },
  { day: 71, title: "Instagram Feed Clone", emoji: "📷", desc: "Instagram feed with likes.", type: "clone", tech: "Clone" },
  { day: 72, title: "Swiggy Clone UI", emoji: "🍔", desc: "Food delivery UI.", type: "clone", tech: "Clone" },
  { day: 73, title: "Zomato Clone UI", emoji: "🍕", desc: "Restaurant list UI.", type: "clone", tech: "Clone" },
  { day: 74, title: "Uber Clone UI", emoji: "🚕", desc: "Cab booking UI.", type: "clone", tech: "Clone" },
  { day: 75, title: "Paytm Clone UI", emoji: "💳", desc: "Payment app UI.", type: "clone", tech: "Clone" },
  { day: 76, title: "IRCTC Clone UI", emoji: "🚆", desc: "Train booking UI.", type: "clone", tech: "Clone" },
  { day: 77, title: "YouTube Music Clone", emoji: "🎵", desc: "Music app clone.", type: "clone", tech: "Clone" },
  { day: 78, title: "Gmail Clone UI", emoji: "📧", desc: "Gmail inbox clone.", type: "clone", tech: "Clone" },
  { day: 79, title: "Maps Clone UI", emoji: "🗺️", desc: "Map UI with locations.", type: "clone", tech: "Clone" },
  { day: 80, title: "Hotstar Clone UI", emoji: "⭐", desc: "Hotstar homepage clone.", type: "clone", tech: "Clone" },
  { day: 81, title: "Discord Clone UI", emoji: "🎮", desc: "Discord chat UI.", type: "clone", tech: "Clone" },
  { day: 82, title: "Pinterest Clone UI", emoji: "📌", desc: "Pinterest grid UI.", type: "clone", tech: "Clone" },
  { day: 83, title: "Reddit Clone UI", emoji: "🤖", desc: "Reddit feed UI.", type: "clone", tech: "Clone" },
  { day: 84, title: "Tinder Clone UI", emoji: "❤️", desc: "Swipe cards UI.", type: "clone", tech: "Clone" },
  { day: 85, title: "Tinder Clone UI", emoji: "❤️", desc: "Swipe cards UI - Part 2.", type: "clone", tech: "Clone" },
  { day: 86, title: "OLX Clone UI", emoji: "🏷️", desc: "Buy sell UI.", type: "clone", tech: "Clone" },
  { day: 87, title: "MakeMyTrip Clone", emoji: "✈️", desc: "Flight booking UI.", type: "clone", tech: "Clone" },
  { day: 88, title: "Cricbuzz Clone UI", emoji: "🏏", desc: "Live cricket score UI.", type: "clone", tech: "Clone" },
  { day: 89, title: "Dream11 Clone UI", emoji: "🏆", desc: "Fantasy team UI.", type: "clone", tech: "Clone" },
  { day: 90, title: "Calculator Pro", emoji: "🧮", desc: "Scientific calculator.", type: "clone", tech: "JS" },
  { day: 91, title: "Weather App Pro", emoji: "🌦️", desc: "Weather with search.", type: "clone", tech: "JS" },
  { day: 92, title: "To-Do App Pro", emoji: "✅", desc: "Advanced To-Do with filter.", type: "clone", tech: "JS" },
  { day: 93, title: "ChatGPT Clone UI", emoji: "🤖", desc: "ChatGPT chat UI with fake AI.", type: "clone", tech: "Clone" },
  { day: 94, title: "LinkedIn Clone Feed UI", emoji: "💼", desc: "LinkedIn feed with like comment.", type: "clone", tech: "Clone" },
  { day: 95, title: "YouTube Clone UI", emoji: "📺", desc: "YouTube with search and player.", type: "clone", tech: "Clone" },

  // GAMES & FUN 96-100
  { day: 96, title: "Krrish Universe", emoji: "🦸", desc: "Superhero website with Jadoo.", type: "game", tech: "Fun" },
  { day: 97, title: "Iron Man vs Krrish", emoji: "⚔️", desc: "Fighting game with health bar.", type: "game", tech: "Game" },
  { day: 98, title: "Avengers Portal Effect", emoji: "🌀", desc: "Endgame portal effect.", type: "game", tech: "Fun" },
  { day: 99, title: "Personal Brand Website", emoji: "🌟", desc: "My personal brand website.", type: "game", tech: "Brand" }
];

let currentFilter = "all";

function setFilter(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll(".filter-btns button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderProjects();
}

function renderProjects() {
  let search = document.getElementById("searchInput").value.toLowerCase();
  let grid = document.getElementById("projectsGrid");
  let filtered = allProjects.filter(p => {
    let matchSearch = p.title.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search);
    let matchFilter = currentFilter === "all" || p.type === currentFilter;
    return matchSearch && matchFilter;
  });

  document.getElementById("resultCount").innerText = "Showing " + filtered.length + " projects";
  document.getElementById("noResult").style.display = filtered.length === 0 ? "block" : "none";

  grid.innerHTML = "";
  filtered.forEach(p => {
    grid.innerHTML += `
      <div class="project-card" onclick="openProject(${p.day})">
        <div class="top"><span class="emoji">${p.emoji}</span><span class="day">Day ${p.day}</span></div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <span class="tag">${p.tech}</span>
        <span class="open">Open Project →</span>
      </div>
    `;
  });
}

function openProject(day) {
  alert("Opening Day " + day + " Project!\n\nIn real portfolio, this will open your GitHub link for Day " + day + ".\nReplace alert with: window.open('https://github.com/yourname/day-' + day)");
}

function scrollToProjects() {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
}

function showCertificate() {
  document.getElementById("certificate").scrollIntoView({ behavior: "smooth" });
}

function printCertificate() {
  window.print();
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

// First load
renderProjects();