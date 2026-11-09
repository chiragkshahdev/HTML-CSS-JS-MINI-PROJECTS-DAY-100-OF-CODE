const grid = document.getElementById("recipeGrid");
const statusEl = document.getElementById("status");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const randomBtn = document.getElementById("randomBtn");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

async function fetchRecipes(query) {
  statusEl.textContent = "Searching recipes...";
  grid.innerHTML = "";
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();
    if (!data.meals) {
      statusEl.textContent = "No recipe found. Try chicken, pasta, cake...";
      return;
    }
    statusEl.textContent = `Found ${data.meals.length} recipes`;
    renderRecipes(data.meals);
  } catch (err) {
    statusEl.textContent = "Something went wrong. Check internet.";
  }
}

async function fetchByCategory(category) {
  if (category === "All") return fetchRecipes("");
  statusEl.textContent = `Loading ${category} recipes...`;
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await res.json();
    renderRecipes(data.meals);
    statusEl.textContent = `Found ${data.meals.length} ${category} recipes`;
  } catch (err) {
    statusEl.textContent = "Something went wrong.";
  }
}

function renderRecipes(meals) {
  grid.innerHTML = meals.map(meal => `
    <div class="card" onclick="openRecipe('${meal.idMeal}')">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="card-body">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea || "International"} • ${meal.strCategory || ""}</p>
        <span class="badge">View Recipe →</span>
      </div>
    </div>
  `).join("");
}

async function openRecipe(id) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  const meal = data.meals[0];

  let ingredients = "";
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim() !== "") {
      ingredients += `<span>${measure} ${ing}</span>`;
    }
  }

  modalBody.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <p>${meal.strArea} • ${meal.strCategory}</p>
    <img src="${meal.strMealThumb}" />
    <h4>Ingredients</h4>
    <div class="ingredients">${ingredients}</div>
    <h4>Instructions</h4>
    <p class="instructions">${meal.strInstructions}</p>
    ${meal.strYoutube ? `<a class="yt-btn" href="${meal.strYoutube}" target="_blank">▶ Watch on YouTube</a>` : ""}
  `;
  modal.classList.add("show");
}

async function randomRecipe() {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
  const data = await res.json();
  renderRecipes(data.meals);
  statusEl.textContent = "Random pick for you!";
}

searchBtn.addEventListener("click", () => fetchRecipes(searchInput.value.trim() || "chicken"));
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") fetchRecipes(searchInput.value.trim() || "chicken");
});
randomBtn.addEventListener("click", randomRecipe);
closeModal.addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("show");
});

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    fetchByCategory(btn.dataset.cat);
  });
});

// Default load
fetchRecipes("chicken");