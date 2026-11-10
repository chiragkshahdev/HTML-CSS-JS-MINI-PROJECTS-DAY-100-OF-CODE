let portalsOpened = false;
let thanosHP = 100;
let heroes = [
  { emoji: "🦸‍♂️", name: "Krrish", power: "India Hero", from: "Virar" },
  { emoji: "🤖", name: "Iron Man", power: "Repulsor Blast", from: "USA" },
  { emoji: "⚡", name: "Thor", power: "Stormbreaker", from: "Asgard" },
  { emoji: "🕷️", name: "Spider Man", power: "Web Shooter", from: "Queens" },
  { emoji: "🛡️", name: "Captain America", power: "Shield", from: "USA" },
  { emoji: "🧙‍♂️", name: "Doctor Strange", power: "Portals", from: "Kamar-Taj" },
  { emoji: "💚", name: "Hulk", power: "Smash", from: "USA" },
  { emoji: "🏹", name: "Hawkeye", power: "Arrow", from: "USA" },
  { emoji: "👽", name: "Jadoo", power: "Dhoop Power", from: "Alien Planet" }
];

// Step 1 - Portals kholo
function openPortals() {
  if (portalsOpened) return;
  portalsOpened = true;

  let portalsArea = document.getElementById("portalsArea");
  let log = document.getElementById("battleLog");
  let storyTitle = document.getElementById("storyTitle");

  storyTitle.innerText = "Doctor Strange ne Portals khol diye!";
  log.innerText = "🌀 Portals khul rahe hai... Saare heroes aa rahe hai...";

  // 6 portals banao
  let portalEmojis = ["🦸‍♂️", "🤖", "⚡", "🕷️", "🧙‍♂️", "💚"];
  portalsArea.innerHTML = "";
  portalEmojis.forEach((emoji, index) => {
    setTimeout(() => {
      portalsArea.innerHTML += `<div class="portal"><span>${emoji}</span></div>`;
    }, index * 300);
  });

  document.getElementById("assembleBtn").disabled = false;

  setTimeout(() => {
    log.innerText = "Portals khul gaye! Ab AVENGERS ASSEMBLE dabao!";
    document.getElementById("thanosDialog").innerText = "Thanos: Ye kya ho raha hai?";
  }, 2000);
}

// Step 2 - Heroes bahar aao
function assembleAvengers() {
  let heroesArmy = document.getElementById("heroesArmy");
  let log = document.getElementById("battleLog");
  let storyTitle = document.getElementById("storyTitle");
  let storySub = document.getElementById("storySub");

  storyTitle.innerText = "AVENGERS... ASSEMBLE!";
  storySub.innerText = "Saare heroes portal se bahar aa gaye! Ab Thanos ki khair nahi!";
  log.innerText = "⚡ Saare heroes aa gaye! Ab Iron Man Snap dabao!";

  heroesArmy.innerHTML = "";
  heroes.forEach((hero, index) => {
    setTimeout(() => {
      heroesArmy.innerHTML += `
        <div class="hero-card">
          <div class="hero-emoji">${hero.emoji}</div>
          <h4>${hero.name}</h4>
          <p>${hero.power}</p>
          <p>From: ${hero.from}</p>
        </div>
      `;
      if (index === heroes.length - 1) {
        document.getElementById("snapBtn").disabled = false;
      }
    }, index * 400);
  });

  document.getElementById("assembleBtn").disabled = true;
}

// Step 3 - Snap Thanos
function snapThanos() {
  let log = document.getElementById("battleLog");
  let thanosChar = document.getElementById("thanosChar");

  log.innerText = "👌 Iron Man ne Snap kiya... I am Iron Man!";
  document.getElementById("thanosDialog").innerText = "Thanos: Nooo... Main haar gaya...";

  // Saare heroes attack animation
  let heroCards = document.querySelectorAll(".hero-card");
  heroCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("attacking");
      setTimeout(() => card.classList.remove("attacking"), 400);
    }, index * 150);
  });

  // Thanos ki HP ghatayo
  let interval = setInterval(() => {
    thanosHP -= 10;
    if (thanosHP < 0) thanosHP = 0;
    document.getElementById("thanosHealth").style.width = thanosHP + "%";
    document.getElementById("thanosHPText").innerText = thanosHP + " HP";
    if (thanosHP <= 0) {
      clearInterval(interval);
      thanosChar.classList.add("dying");
      setTimeout(() => {
        document.getElementById("winnerPopup").style.display = "flex";
      }, 1500);
    }
  }, 300);

  document.getElementById("snapBtn").disabled = true;
}

// Reset
function resetBattle() {
  portalsOpened = false;
  thanosHP = 100;
  document.getElementById("portalsArea").innerHTML = "";
  document.getElementById("heroesArmy").innerHTML = "";
  document.getElementById("thanosHealth").style.width = "100%";
  document.getElementById("thanosHPText").innerText = "100 HP";
  document.getElementById("thanosChar").classList.remove("dying");
  document.getElementById("thanosDialog").innerText = '"I am Inevitable!"';
  document.getElementById("storyTitle").innerText = "Thanos aa gaya hai... Avengers haar rahe hai...";
  document.getElementById("storySub").innerText = "Captain America akela hai. Ab bas ek hi umeed hai - Doctor Strange ke Portals!";
  document.getElementById("battleLog").innerText = "Doctor Strange portal kholne ke liye ready hai...";
  document.getElementById("assembleBtn").disabled = true;
  document.getElementById("snapBtn").disabled = true;
  document.getElementById("winnerPopup").style.display = "none";
}