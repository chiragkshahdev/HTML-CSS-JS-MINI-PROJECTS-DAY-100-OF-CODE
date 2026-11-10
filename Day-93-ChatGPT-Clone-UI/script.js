// Enter dabane pe bhi message jaye
document.getElementById("userInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMsg();
  }
});

function sendMsg() {
  let input = document.getElementById("userInput");
  let text = input.value.trim();
  if (text === "") return;

  let chatArea = document.getElementById("chatArea");

  // User ka message add karo
  chatArea.innerHTML += `<div class="msg"><div class="avatar user-avatar">U</div><div>${text}</div></div>`;
  input.value = "";
  chatArea.scrollTop = chatArea.scrollHeight;

  // AI ka fake reply - 1 sec baad
  setTimeout(() => {
    let reply = "Ye mast sawal hai! Day 93 me hum sirf UI bana rahe hai, asli AI Day 100 ke baad aayega. Par tera UI ekdum ChatGPT jaisa lag raha hai!";
    
    if (text.toLowerCase().includes("hi") || text.toLowerCase().includes("hello")) {
      reply = "Hello bhai! Kaise ho? Day 93 tak aa gaye, ab bas 7 din bache hai!";
    }

    chatArea.innerHTML += `<div class="msg"><div class="avatar ai-avatar">AI</div><div>${reply}</div></div>`;
    chatArea.scrollTop = chatArea.scrollHeight;
  }, 1000);
}

function newChat() {
  document.getElementById("chatArea").innerHTML = `<div class="msg"><div class="avatar ai-avatar">AI</div><div>Nayi chat shuru ho gayi! Bolo kya puchna hai?</div></div>`;
}