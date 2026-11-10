const products = [
  { id: 1, name: "iPhone 15", category: "mobile", price: 79999, img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400", desc: "128GB | Super Retina Display" },
  { id: 2, name: "Samsung Galaxy S24", category: "mobile", price: 69999, img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400", desc: "256GB | 5G | AI Camera" },
  { id: 3, name: "MacBook Air M2", category: "laptop", price: 99900, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", desc: "13.6 inch | 8GB RAM" },
  { id: 4, name: "HP Pavilion Laptop", category: "laptop", price: 55990, img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400", desc: "i5 | 16GB | 512GB SSD" },
  { id: 5, name: "Apple Watch Ultra", category: "watch", price: 89900, img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400", desc: "GPS + Cellular | 49mm" },
  { id: 6, name: "Noise Smartwatch", category: "watch", price: 2999, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", desc: "AMOLED | Bluetooth Calling" },
  { id: 7, name: "Nike Air Jordan", category: "shoes", price: 5995, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", desc: "Running Shoes | Red" },
  { id: 8, name: "Adidas Sneakers", category: "shoes", price: 3999, img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400", desc: "Daily Wear | White" },
];

let cart = [];
let currentCategory = "all";
let searchText = "";

const grid = document.getElementById("productGrid");

function displayProducts(list) {
  grid.innerHTML = "";
  if (list.length === 0) {
    grid.innerHTML = "<h3>No products found!</h3>";
    return;
  }
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <p class="price">₹${p.price.toLocaleString('en-IN')}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    grid.appendChild(div);
  });
}

function filterAndSort() {
  let filtered = products.filter(p => {
    const matchCat = currentCategory === "all" || p.category === currentCategory;
    const matchSearch = p.name.toLowerCase().includes(searchText.toLowerCase());
    return matchCat && matchSearch;
  });
  const sortVal = document.getElementById("sortSelect").value;
  if (sortVal === "low") filtered.sort((a,b) => a.price - b.price);
  if (sortVal === "high") filtered.sort((a,b) => b.price - a.price);
  displayProducts(filtered);
}

function addToCart(id) {
  const found = cart.find(item => item.id === id);
  if (found) found.qty++;
  else {
    const prod = products.find(p => p.id === id);
    cart.push({ ...prod, qty: 1 });
  }
  updateCart();
  document.getElementById("cartSidebar").classList.add("open");
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cartCount").innerText = count;
  document.getElementById("cartTotal").innerText = total.toLocaleString('en-IN');

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Cart is empty</p>";
    return;
  }
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div><b>${item.name}</b><br>₹${item.price} x ${item.qty}</div>
      <div>
        <button onclick="changeQty(${item.id}, -1)">-</button>
        <button onclick="changeQty(${item.id}, 1)">+</button>
        <button onclick="removeItem(${item.id})">❌</button>
      </div>
    </div>
  `).join("");
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  updateCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}

// Events
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    filterAndSort();
  });
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchText = e.target.value;
  filterAndSort();
});

document.getElementById("sortSelect").addEventListener("change", filterAndSort);
document.getElementById("cartBtn").addEventListener("click", () => document.getElementById("cartSidebar").classList.add("open"));
document.getElementById("closeCart").addEventListener("click", () => document.getElementById("cartSidebar").classList.remove("open"));
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) return alert("Cart empty hai!");
  alert("Order Placed Successfully! Total: ₹" + document.getElementById("cartTotal").innerText);
  cart = [];
  updateCart();
});

displayProducts(products);
updateCart();