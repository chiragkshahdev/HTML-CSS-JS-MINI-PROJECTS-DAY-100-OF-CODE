// Like button ka logic
function likePost(element) {
  let countTag = element.querySelector("b");
  let count = parseInt(countTag.innerText);

  if (element.classList.contains("liked")) {
    element.classList.remove("liked");
    countTag.innerText = count - 1;
  } else {
    element.classList.add("liked");
    countTag.innerText = count + 1;
  }
}

// Comment box pe focus karo
function focusComment(element) {
  let post = element.closest(".post");
  let input = post.querySelector(".comment-box input");
  input.focus();
}

// Comment add karo
function addComment(input) {
  let text = input.value.trim();
  if (text === "") return;

  let commentsDiv = input.parentElement.querySelector(".comments");
  commentsDiv.innerHTML += `<p><b>You:</b> ${text}</p>`;
  input.value = "";
}

// Naya Post add karo
function addPost() {
  let input = document.getElementById("postInput");
  let text = input.value.trim();
  if (text === "") {
    alert("Pehle kuch likh to bhai!");
    return;
  }

  let feed = document.getElementById("feed");
  let newPost = `
    <div class="post">
      <div class="post-header">
        <div class="small-avatar">👤</div>
        <div><b>You</b><p>BSCIT Student | Just now</p></div>
      </div>
      <p class="post-text">${text}</p>
      <div class="post-actions">
        <span onclick="likePost(this)">👍 Like (<b>0</b>)</span>
        <span onclick="focusComment(this)">💬 Comment</span>
        <span>↗️ Share</span>
      </div>
      <div class="comment-box">
        <input type="text" placeholder="Add a comment..." onkeypress="if(event.key==='Enter') addComment(this)">
        <div class="comments"></div>
      </div>
    </div>
  `;
  feed.innerHTML = newPost + feed.innerHTML;
  input.value = "";
}

// Follow button
function followBtn(btn) {
  if (btn.innerText === "+ Follow") {
    btn.innerText = "✓ Following";
    btn.style.background = "#0A66C2";
    btn.style.color = "white";
  } else {
    btn.innerText = "+ Follow";
    btn.style.background = "white";
    btn.style.color = "black";
  }
}