const usernameEl = document.getElementById('username');
const searchBtn = document.getElementById('searchBtn');
const profileEl = document.getElementById('profile');

async function getUser(username){
  username = username.trim();
  if(!username) return;
  
  profileEl.innerHTML = '<p>Loading...</p>';
  profileEl.classList.add('show');
  
  try{
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
    
    if(res.status === 404){
      profileEl.innerHTML = `<p style="color:#ff7675">❌ User "${username}" not found!</p>`;
      return;
    }
    if(res.status === 403){
      profileEl.innerHTML = `<p style="color:#fdcb6e">⚠️ API limit reached, thodi der baad try kar</p>`;
      return;
    }
    
    const data = await res.json();
    
    // Profile pehle dikha do
    profileEl.innerHTML = `
      <div class="profile-top">
        <img src="${data.avatar_url}" alt="avatar">
        <div>
          <h2>${data.name ? data.name : data.login}</h2>
          <p>@${data.login}</p>
          <p>${data.bio ? data.bio : 'No bio'}</p>
          <p>📍 ${data.location || 'No location'}</p>
        </div>
      </div>
      <div class="stats">
        <div class="stat"><h3>${data.followers}</h3><p>Followers</p></div>
        <div class="stat"><h3>${data.following}</h3><p>Following</p></div>
        <div class="stat"><h3>${data.public_repos}</h3><p>Repos</p></div>
      </div>
      <div class="repos" id="repos"><p>Loading repos...</p></div>
    `;

    // Repos alag se try karo - fail bhi hua to profile to dikhega
    try{
      const repoRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=5`);
      const repos = await repoRes.json();
      const reposEl = document.getElementById('repos');
      
      if(repos.length === 0){
        reposEl.innerHTML = '<h3>Latest Repos</h3><p>No repos</p>';
      } else {
        reposEl.innerHTML = `<h3>Latest Repos</h3>` + repos.map(r => 
          `<div class="repo"><a href="${r.html_url}" target="_blank">${r.name}</a><span>⭐${r.stargazers_count}</span></div>`
        ).join('');
      }
    } catch(e){
      document.getElementById('repos').innerHTML = '<p>Repos load nahi hue</p>';
    }

  } catch(err){
    profileEl.innerHTML = `<p style="color:#d63031">Error: ${err.message}. Internet check kar</p>`;
  }
}

searchBtn.addEventListener('click', ()=>{
  getUser(usernameEl.value);
});

usernameEl.addEventListener('keypress', e=>{
  if(e.key === 'Enter') getUser(usernameEl.value);
});

// Test ke liye - pehle se ek user load karega
getUser('github');