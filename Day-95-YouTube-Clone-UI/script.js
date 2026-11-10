// Video pe click karne pe player kholo
function playVideo(title) {
  document.getElementById("player").style.display = "block";
  document.getElementById("playerTitle").innerText = title;
  document.getElementById("likeCount").innerText = "0";
  document.getElementById("subBtn").innerText = "🔴 Subscribe";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Player band karo
function closePlayer() {
  document.getElementById("player").style.display = "none";
}

// Like button
function likeVideo() {
  let countTag = document.getElementById("likeCount");
  let count = parseInt(countTag.innerText);
  countTag.innerText = count + 1;
}

// Subscribe button
function subscribeVideo() {
  let btn = document.getElementById("subBtn");
  if (btn.innerText.includes("Subscribe")) {
    btn.innerText = "✓ Subscribed";
    btn.style.background = "#eee";
  } else {
    btn.innerText = "🔴 Subscribe";
    btn.style.background = "white";
  }
}

// Search ka logic
function searchVideo() {
  let searchText = document.getElementById("searchInput").value.toLowerCase().trim();
  let cards = document.querySelectorAll(".video-card");

  cards.forEach(card => {
    let title = card.getAttribute("data-title");
    if (title.includes(searchText) || searchText === "") {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Chip filter
function filterChip(btn) {
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  btn.classList.add("active");

  let text = btn.innerText.toLowerCase();
  if (text === "all") {
    document.getElementById("searchInput").value = "";
    searchVideo();
  } else {
    document.getElementById("searchInput").value = text;
    searchVideo();
  }
}