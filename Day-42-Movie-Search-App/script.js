const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const moviesEl = document.getElementById('movies');

const API_KEY = "thewdb"; // demo key, tu apna lele omdbapi.com se
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

async function searchMovies(query){
  if(!query) return;
  moviesEl.innerHTML = '<p>Loading...</p>';
  
  const res = await fetch(API_URL + query);
  const data = await res.json();
  
  moviesEl.innerHTML = '';
  
  if(data.Response === 'False'){
    moviesEl.innerHTML = `<p>${data.Error}</p>`;
    return;
  }

  data.Search.forEach(movie => {
    const div = document.createElement('div');
    div.className = 'movie-card';
    div.innerHTML = `
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x280?text=No+Image'}" alt="">
      <div class="info">
        <h3>${movie.Title}</h3>
        <p>${movie.Year} • ${movie.Type}</p>
      </div>
    `;
    moviesEl.appendChild(div);
  });
}

searchBtn.addEventListener('click', ()=>{
  searchMovies(searchInput.value.trim());
});

searchInput.addEventListener('keypress', e=>{
  if(e.key === 'Enter') searchMovies(searchInput.value.trim());
});

// Default load
searchMovies('Avengers');