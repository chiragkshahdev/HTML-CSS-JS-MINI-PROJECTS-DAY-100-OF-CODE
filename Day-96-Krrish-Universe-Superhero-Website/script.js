// Scroll to section
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Become Krrish button
function becomeKrrish() {
  let msg = document.getElementById("krrishMsg");
  let powerLevel = document.getElementById("powerLevel");
  let powerFill = document.getElementById("powerFill");

  msg.innerText = "🦸 Tum ab Krrish ban gaye! Mask pehen lo, duniya ko bachana hai!";
  powerLevel.innerText = "100";
  powerFill.style.width = "100%";
  alert("Welcome to Krrish Universe! Ab tum Superhero ho!");
}

// Join Universe
function joinUniverse() {
  let name = prompt("Apna Superhero naam likho:");
  if (name) {
    alert(name + ", welcome to Krrish Universe! Tumhara Power Level 100 hai!");
  }
}

// Power use karo
function usePower(powerName, power) {
  let result = document.getElementById("powerResult");
  let powerLevel = document.getElementById("powerLevel");
  let powerFill = document.getElementById("powerFill");

  result.innerText = "⚡ Tumne " + powerName + " use kiya! Power: " + power + "/100. Krrish mode ON!";
  powerLevel.innerText = power;
  powerFill.style.width = power + "%";
}

// Villain se lado
function fightVillain(villainName) {
  let result = document.getElementById("fightResult");
  let messages = [
    "Krrish ne ek punch mara aur " + villainName + " hawa me ud gaya! Krrish Jeet Gaya! 🏆",
    villainName + " ne attack kiya, par Krrish ne dodge kar liya! Krrish Jeet Gaya! 💪",
    "Krrish ne Flying Kick maari! " + villainName + " haar gaya! India safe hai! 🇮🇳"
  ];
  let random = Math.floor(Math.random() * messages.length);
  result.innerText = messages[random];
}

// Jadoo ko uthao
function callJadoo() {
  let jadooText = document.getElementById("jadooText");
  let jadooEmoji = document.getElementById("jadooEmoji");
  jadooEmoji.innerText = "👽";
  jadooText.innerText = "Jadoo: Uhhh... Dhoop... Mujhe dhoop chahiye! Tum mere dost ho!";
  document.body.style.background = "#1A2A1A";
  setTimeout(() => {
    document.body.style.background = "#0A0A1A";
  }, 2000);
}

// Jadoo Dance
function jadooDance() {
  let jadooEmoji = document.getElementById("jadooEmoji");
  let jadooText = document.getElementById("jadooText");
  jadooText.innerText = "Jadoo dance kar raha hai! 🕺 Uuhhh... Uuhhh...";
  jadooEmoji.style.transform = "rotate(20deg) scale(1.2)";
  setTimeout(() => {
    jadooEmoji.style.transform = "rotate(0deg) scale(1)";
    jadooText.innerText = "Jadoo thak gaya... Ab Jadoo ko dhoop me bitha do!";
  }, 1500);
}