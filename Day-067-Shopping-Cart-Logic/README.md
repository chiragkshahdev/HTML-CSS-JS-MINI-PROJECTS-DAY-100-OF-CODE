# Day-67 - Shopping Cart Logic

A complete shopping cart system with real cart logic - not just UI.

## Features
- ✅ Add / Remove items
- ✅ Quantity + / - (min 1, max 5)
- ✅ Save for Later
- ✅ Clear All Cart
- ✅ Live Price Calculation
    - Subtotal, Discount, Delivery, Platform Fee, Grand Total
- ✅ Coupon System
    - `SHOP10` = 10% OFF
    - `WELCOME20` = 20% OFF
    - `FLAT50` = ₹50 OFF
- ✅ Free Delivery Logic (FREE above ₹999, else ₹49)
- ✅ Free Delivery Progress Bar
- ✅ Empty Cart State
- ✅ localStorage Persistence - Refresh karne par bhi cart rahega

## Tech Stack
- HTML5 - Structure
- CSS3 - Grid, Flexbox, Responsive
- Vanilla JavaScript - Cart State, Calculations, DOM Rendering

## File Structure
Day-067-Shopping-Cart-Logic/
├── index.html
├── style.css
├── script.js
└── README.md

## How to Run
1. Keep all 4 files in same folder
2. Open `index.html` in browser
3. Try: Change qty, Apply coupon `SHOP10`, Refresh page - cart will stay

## Cart Logic Explained
Subtotal = Sum(price * qty)
Discount = Subtotal * Coupon%
Delivery = Subtotal >= 999 ? FREE : ₹49
Grand Total = Subtotal - Discount + Delivery + ₹9 Platform Fee

## Future Improvements
- Connect to Day-66 Product Page (shared cart)
- Quantity in DB / Backend API
- Address + Payment page

---
Built as part of 100 Days of Code Challenge - Day 67
Continues Day-66 E-commerce Product Page