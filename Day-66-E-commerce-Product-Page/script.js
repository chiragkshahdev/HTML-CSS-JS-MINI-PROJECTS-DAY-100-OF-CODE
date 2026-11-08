let qty = 1;
let cart = [];
const unitPrice = 2499;

const qtyValue = document.getElementById('qtyValue');
const mainImg = document.getElementById('mainImg');
const toast = document.getElementById('toast');

// Thumbnail Gallery
document.querySelectorAll('.thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    mainImg.src = thumb.src.replace('w=200', 'w=800');
  });
});

// Color Selector
document.querySelectorAll('.color').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.color').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('colorName').textContent = btn.dataset.color;
  });
});

// Quantity
document.getElementById('plus').addEventListener('click', () => {
  if (qty < 5) qty++;
  qtyValue.textContent = qty;
  updatePrice();
});
document.getElementById('minus').addEventListener('click', () => {
  if (qty > 1) qty--;
  qtyValue.textContent = qty;
  updatePrice();
});

function updatePrice() {
  document.getElementById('price').textContent = '₹' + (unitPrice * qty).toLocaleString('en-IN');
}

// Wishlist
document.getElementById('wishBtn').addEventListener('click', function() {
  this.classList.toggle('active');
  this.textContent = this.classList.contains('active') ? '♥' : '♡';
  showToast(this.classList.contains('active') ? 'Added to Wishlist!' : 'Removed from Wishlist');
});

// Add to Cart
document.getElementById('addCart').addEventListener('click', () => {
  const color = document.getElementById('colorName').textContent;
  cart.push({ name: `Aura Pro - ${color}`, qty, price: unitPrice * qty });
  renderCart();
  showToast('Added to cart!');
});

document.getElementById('buyNow').addEventListener('click', () => {
  showToast('Redirecting to Checkout...');
  setTimeout(() => alert(`Order Placed!\nQty: ${qty}\nTotal: ₹${(unitPrice * qty).toLocaleString('en-IN')}`), 500);
});

// Cart Drawer
const drawer = document.getElementById('cartDrawer');
document.getElementById('cartBtn').addEventListener('click', () => drawer.classList.add('open'));
document.getElementById('closeCart').addEventListener('click', () => drawer.classList.remove('open'));

function renderCart() {
  document.getElementById('cartCount').textContent = cart.length;
  const container = document.getElementById('cartItems');
  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    container.innerHTML = cart.map((item, i) => `
      <div class="cart-item">
        <div><b>${item.name}</b><br><small>Qty: ${item.qty}</small></div>
        <b>₹${item.price.toLocaleString('en-IN')}</b>
      </div>
    `).join('');
  }
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('cartTotal').textContent = '₹' + total.toLocaleString('en-IN');
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

renderCart();