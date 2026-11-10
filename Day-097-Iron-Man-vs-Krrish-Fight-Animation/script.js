let krrishHP = 100;
let ironHP = 100;
let krrishEnergy = 100;
let ironEnergy = 100;
let krrishWins = 0;
let ironWins = 0;
let roundNum = 1;
let gameOver = false;

// Krrish ka attack
function krrishAttack(type) {
  if (gameOver) return;

  let damage = 0;
  let msg = "";
  let energyCost = 0;

  if (type === "punch") {
    damage = 10;
    energyCost = 5;
    msg = "🦸 Krrish ne Punch maara! Iron Man ko -10 Damage!";
  } else if (type === "kick") {
    damage = 15;
    energyCost = 10;
    msg = "🦶 Krrish ne Flying Kick maari! Iron Man ko -15 Damage!";
  } else if (type === "special") {
    damage = 25;
    energyCost = 20;
    msg = "⚡ KRRISH SPECIAL! Krrish ne hawa me udke Super Punch maara! -25 Damage!";
  }

  if (krrishEnergy < energyCost) {
    alert("Energy kam hai! Heal karo ya Punch maro!");
    return;
  }

  krrishEnergy -= energyCost;
  ironHP -= damage;
  if (ironHP < 0) ironHP = 0;

  // Animation
  animateAttack("krrishChar", "ironChar");
  shakeArena();
  showDamage("-" + damage + " HP");
  updateUI();
  updateLog(msg);

  // Check winner
  if (ironHP <= 0) {
    krrishWins++;
    showWinner("Krrish", "🦸‍♂️", "India ka Superhero jeet gaya! Jai Ho!");
    return;
  }

  // Iron Man ka jawab - 1 sec baad
  setTimeout(() => {
    ironAutoAttack();
  }, 1000);
}

// Iron Man ka attack - Computer
function ironAutoAttack() {
  if (gameOver) return;

  let attacks = [
    { name: "Repulsor Blast", damage: 12, msg: "🤖 Iron Man ne Repulsor Blast maara! Krrish ko -12 Damage!" },
    { name: "Missile Attack", damage: 18, msg: "🚀 Iron Man ne Missile chhoda! Krrish ko -18 Damage!" },
    { name: "Unibeam", damage: 22, msg: "💥 Iron Man ka UNIBEAM! Krrish ko -22 Damage!" }
  ];

  let random = Math.floor(Math.random() * attacks.length);
  let attack = attacks[random];

  krrishHP -= attack.damage;
  if (krrishHP < 0) krrishHP = 0;

  animateAttack("ironChar", "krrishChar");
  shakeArena();
  showDamage("-" + attack.damage + " HP");
  updateUI();
  updateLog(attack.msg);

  if (krrishHP <= 0) {
    ironWins++;
    showWinner("Iron Man", "🤖", "Jarvis: Sir, we won! USA jeet gaya!");
    return;
  }
}

// Krrish Heal
function krrishHeal() {
  if (gameOver) return;
  if (krrishHP >= 100) {
    alert("HP full hai bhai!");
    return;
  }
  krrishHP += 20;
  if (krrishHP > 100) krrishHP = 100;
  krrishEnergy += 10;
  if (krrishEnergy > 100) krrishEnergy = 100;

  updateLog("💚 Jadoo ne Krrish ko heal kar diya! +20 HP! Jadoo: Uhhh...");
  updateUI();
}

// Animation helper
function animateAttack(attackerId, victimId) {
  let attacker = document.getElementById(attackerId);
  let victim = document.getElementById(victimId);
  attacker.classList.add("attack");
  victim.classList.add("hit");
  setTimeout(() => {
    attacker.classList.remove("attack");
    victim.classList.remove("hit");
  }, 400);
}

function shakeArena() {
  let arena = document.getElementById("arena");
  arena.classList.add("shake");
  setTimeout(() => arena.classList.remove("shake"), 300);
}

function showDamage(text) {
  let dmg = document.getElementById("damageText");
  dmg.innerText = text;
  setTimeout(() => dmg.innerText = "", 1000);
}

function updateLog(msg) {
  document.getElementById("fightLog").innerText = msg;
}

function updateUI() {
  document.getElementById("krrishHealth").style.width = krrishHP + "%";
  document.getElementById("ironHealth").style.width = ironHP + "%";
  document.getElementById("krrishHPText").innerText = krrishHP + " HP";
  document.getElementById("ironHPText").innerText = ironHP + " HP";
  document.getElementById("krrishEnergy").innerText = krrishEnergy;
  document.getElementById("ironEnergy").innerText = ironEnergy;
  document.getElementById("krrishWins").innerText = krrishWins;
  document.getElementById("ironWins").innerText = ironWins;
  document.getElementById("roundNum").innerText = roundNum;
}

function showWinner(name, emoji, sub) {
  gameOver = true;
  document.getElementById("winnerEmoji").innerText = emoji;
  document.getElementById("winnerText").innerText = name + " Jeet Gaya!";
  document.getElementById("winnerSub").innerText = sub;
  document.getElementById("winnerPopup").style.display = "flex";

  if (name === "Krrish") {
    document.getElementById("krrishChar").classList.add("win");
    document.getElementById("ironChar").classList.add("dead");
  } else {
    document.getElementById("ironChar").classList.add("win");
    document.getElementById("krrishChar").classList.add("dead");
  }
  updateUI();
}

function nextRound() {
  document.getElementById("winnerPopup").style.display = "none";
  roundNum++;
  krrishHP = 100;
  ironHP = 100;
  krrishEnergy = 100;
  gameOver = false;
  document.getElementById("krrishChar").classList.remove("win", "dead");
  document.getElementById("ironChar").classList.remove("win", "dead");
  updateLog("Round " + roundNum + " shuru! Phir se lado!");
  updateUI();
}

function resetFight() {
  krrishHP = 100;
  ironHP = 100;
  krrishEnergy = 100;
  ironEnergy = 100;
  krrishWins = 0;
  ironWins = 0;
  roundNum = 1;
  gameOver = false;
  document.getElementById("winnerPopup").style.display = "none";
  document.getElementById("krrishChar").classList.remove("win", "dead");
  document.getElementById("ironChar").classList.remove("win", "dead");
  updateLog("Naya Match shuru! Fight dabao!");
  updateUI();
}