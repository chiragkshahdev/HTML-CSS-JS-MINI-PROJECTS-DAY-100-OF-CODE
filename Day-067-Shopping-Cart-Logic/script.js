// --- DATA ---
const SAMPLE_PRODUCTS = [
  { id: 1, name: "Aura Pro Wireless Headphones", color: "Midnight Black", price: 2499, mrp: 3599, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80" },
  { id: 2, name: "Echo Smart Watch Fit", color: "Graphite", price: 1799, mrp: 2999, img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&q=80" },
  { id: 3, name: "BassPods Wireless Earbuds", color: "White", price: 999, mrp: 1999, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&q=80" },
];

const COUPONS = { SHOP10: 0.10, WELCOME20: 0.20, FLAT50: 50 };

// --- STATE (localStorage) ---
let cart = JSON.parse(localStorage.getItem('shopkart_cart')) || [];
let appliedCoupon = localStorage.getItem('shopkart_coupon') || null;

if (cart.length === 0) {
  cart = [
    { ...SAMPLE_PRODUCTS[0], qty: 1 },
    { ...SAMPLE_PRODUCTS[1], qty: 1 },
  ];
  saveCart();
}

function saveCart() {
  localStorage.setItem('shopkart_cart', JSON.stringify(cart));
  if (appliedCoupon) localStorage.setItem('shopkart_coupon', appliedCoupon);
  else localStorage.removeItem('shopkart_coupon');
}

// --- RENDER ---
function renderCart() {
  const container = document.getElementById('cartItems');
  const emptyState = document.getElementById('emptyState');
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  document.getElementById('cartCount').textContent = totalQty;
  document.getElementById('itemCountText').textContent = `(${totalQty} items)`;

  if (cart.length === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}" />
        <div class="item-info">
          <h3>${item.name}</h3>
          <p class="meta">Color: ${item.color} • In Stock</p>
          <div class="price-row">
            <b>₹${item.price.toLocaleString('en-IN')}</b>
            <del>₹${item.mrp.toLocaleString('en-IN')}</del>
            <span class="off">${Math.round((1 - item.price/item.mrp)*100)}% off</span>
          </div>
          <div class="item-actions">
            <div class="qty">
              <button onclick="changeQty(${item.id}, -1)">-</button>
              <span>${item.qty}</span>
              <button onclick="changeQty(${item.id}, 1)">+</button>
            </div>
            <button class="save-later" onclick="saveForLater(${item.id})">Save for later</button>
            <button class="remove" onclick="removeItem(${item.id})">Remove ✕</button>
          </div>
        </div>
        <div class="item-total">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
      </div>
    `).join('');
  }
  updateSummary();
}

function updateSummary() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  let discount = 0;

  if (appliedCoupon && COUPONS[appliedCoupon]) {
    const val = COUPONS[appliedCoupon];
    discount = val < 1 ? Math.round(subtotal * val) : Math.min(val, subtotal);
    document.getElementById('couponMsg').textContent = `✅ Coupon ${appliedCoupon} applied!`;
    document.getElementById('couponMsg').style.color = '#16a34a';
    document.getElementById('couponInput').value = appliedCoupon;
  }

  const afterDiscount = subtotal - discount;
  const delivery = cart.length === 0 ? 0 : (afterDiscount >= 999 ? 0 : 49);
  const platformFee = cart.length === 0 ? 0 : 9;
  const grandTotal = afterDiscount + delivery + platformFee;

  document.getElementById('subtotal').textContent = '₹' + subtotal.toLocaleString('en-IN');
  document.getElementById('discount').textContent = '- ₹' + discount.toLocaleString('en-IN');
  document.getElementById('delivery').textContent = delivery === 0 ? 'FREE' : '₹' + delivery;
  document.getElementById('grandTotal').textContent = '₹' + grandTotal.toLocaleString('en-IN');
  document.getElementById('saveMsg').textContent = discount > 0 ? `You will save ₹${discount.toLocaleString('en-IN')} on this order` : '';

  // Free delivery progress
  const pct = Math.min((afterDiscount / 999) * 100, 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('freeShipMsg').innerHTML = afterDiscount >= 999
    ? '🎉 You have unlocked <b>FREE Delivery!</b>'
    : `Add <b>₹${(999 - afterDiscount).toLocaleString('en-IN')}</b> more for FREE Delivery`;
}

// --- ACTIONS ---
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
    showToast('Item removed');
  } else if (item.qty > 5) {
    item.qty = 5;
    showToast('Max 5 qty allowed');
  } else {
    showToast('Quantity updated');
  }
  saveCart(); renderCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart(); renderCart();
  showToast('Item removed from cart');
}

function saveForLater(id) {
  removeItem(id);
  showToast('Saved for later ❤️');
}

function addSampleProducts() {
  cart = SAMPLE_PRODUCTS.map(p => ({ ...p, qty: 1 }));
  saveCart(); renderCart();
  showToast('Sample products added!');
}

document.getElementById('addSample').addEventListener('click', addSampleProducts);
document.getElementById('clearCart').addEventListener('click', () => {
  if (confirm('Clear entire cart?')) {
    cart = []; appliedCoupon = null;
    saveCart(); renderCart();
    showToast('Cart cleared');
  }
});

document.getElementById('applyCoupon').addEventListener('click', () => {
  const code = document.getElementById('couponInput').value.trim().toUpperCase();
  if (COUPONS[code]) {
    appliedCoupon = code;
    saveCart(); renderCart();
    showToast(`Coupon ${code} applied!`);
  } else {
    document.getElementById('couponMsg').textContent = '❌ Invalid coupon code';
    document.getElementById('couponMsg').style.color = '#dc2626';
  }
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (cart.length === 0) return alert('Cart is empty!');
  const total = document.getElementById('grandTotal').textContent;
  alert(`Order Placed Successfully! 🎉\nTotal: ${total}`);
  cart = []; appliedCoupon = null;
  saveCart(); renderCart();
});

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

renderCart();