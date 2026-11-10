# Day 92 - Dashboard Analytics UI

A modern admin dashboard with live charts, stats, search and dark mode.

## Features
- Sidebar navigation
- 4 Stats cards: Revenue, Users, Orders, Conversion
- Line chart: Revenue vs Orders (Chart.js)
- Doughnut chart: Traffic Sources
- Recent Orders table with search filter
- Top Products with progress bars
- Date range filter: 7 / 30 / 90 Days - updates stats + chart
- Dark / Light mode toggle
- Fully responsive (sidebar hides on mobile)

## Tech Used
- HTML, CSS, JavaScript
- Chart.js via CDN

## How to Run
1. Download all 4 files in same folder
2. Double click `index.html`
3. Internet needed for Chart.js CDN
4. Or use VS Code Live Server

## How to Customize
- Open `script.js` and edit `orders` array for your own orders
- Edit `topProducts` array for your products
- Change chart data in `lineChart` datasets

## Future Ideas
- Add real API data
- Add login page
- Add export CSV button
- Add notifications panel