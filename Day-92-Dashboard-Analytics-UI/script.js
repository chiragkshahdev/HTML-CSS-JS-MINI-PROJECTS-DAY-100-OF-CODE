const orders = [
  { name: "Rahul Verma", product: "iPhone 15", amount: "₹72,999", status: "Success" },
  { name: "Priya Singh", product: "MacBook Air", amount: "₹98,500", status: "Pending" },
  { name: "Aman Khan", product: "AirPods Pro", amount: "₹18,999", status: "Success" },
  { name: "Sneha Patel", product: "Smart Watch", amount: "₹4,999", status: "Failed" },
  { name: "Vikash Yadav", product: "Headphones", amount: "₹2,499", status: "Success" },
  { name: "Neha Gupta", product: "Keyboard", amount: "₹1,999", status: "Success" },
];

const topProducts = [
  { name: "iPhone 15", sales: "1,240 sold", pct: 85, color: "#3b82f6" },
  { name: "MacBook Air", sales: "980 sold", pct: 70, color: "#22c55e" },
  { name: "AirPods Pro", sales: "860 sold", pct: 60, color: "#f59e0b" },
  { name: "Smart Watch", sales: "640 sold", pct: 45, color: "#a855f7" },
];

function renderOrders(list) {
  document.getElementById("orderTable").innerHTML = list.map(o => `
    <tr>
      <td><b>${o.name}</b></td>
      <td>${o.product}</td>
      <td><b>${o.amount}</b></td>
      <td><span class="badge ${o.status === "Success" ? "success" : o.status === "Pending" ? "pending" : "failed"}">${o.status}</span></td>
    </tr>
  `).join("");
}

function renderTopProducts() {
  document.getElementById("topProducts").innerHTML = topProducts.map(p => `
    <div class="product-row">
      <div style="flex:1">
        <b>${p.name}</b><small>${p.sales}</small>
        <div class="progress"><i style="width:${p.pct}%; background:${p.color}"></i></div>
      </div>
      <b style="margin-left:10px">${p.pct}%</b>
    </div>
  `).join("");
}

// Line Chart
const lineCtx = document.getElementById("lineChart");
let lineChart = new Chart(lineCtx, {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "Revenue",
      data: [42000, 58000, 45000, 72000, 68000, 89000, 95000],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59,130,246,0.15)",
      fill: true,
      tension: 0.4,
      pointRadius: 5
    },
    {
      label: "Orders",
      data: [28000, 34000, 30000, 45000, 48000, 56000, 62000],
      borderColor: "#22c55e",
      backgroundColor: "rgba(34,197,94,0.1)",
      fill: true,
      tension: 0.4,
      pointRadius: 4
    }]
  },
  options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }
});

// Doughnut Chart
new Chart(document.getElementById("doughnutChart"), {
  type: "doughnut",
  data: {
    labels: ["Google", "Instagram", "Direct", "Others"],
    datasets: [{ data: [45, 30, 15, 10], backgroundColor: ["#3b82f6", "#22c55e", "#f59e0b", "#a855f7"] }]
  },
  options: { responsive: true, plugins: { legend: { display: false } } }
});

// Search Filter
document.getElementById("searchInput").addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  const filtered = orders.filter(o => o.name.toLowerCase().includes(q) || o.product.toLowerCase().includes(q));
  renderOrders(filtered);
});

// Range Filter - changes stats and chart
document.getElementById("rangeSelect").addEventListener("change", (e) => {
  const val = e.target.value;
  if (val === "7") {
    document.getElementById("revenueVal").textContent = "₹4,82,000";
    document.getElementById("usersVal").textContent = "24,580";
    document.getElementById("ordersVal").textContent = "3,420";
    lineChart.data.datasets[0].data = [42000, 58000, 45000, 72000, 68000, 89000, 95000];
  } else if (val === "30") {
    document.getElementById("revenueVal").textContent = "₹18,20,000";
    document.getElementById("usersVal").textContent = "68,420";
    document.getElementById("ordersVal").textContent = "12,850";
    lineChart.data.datasets[0].data = [120000, 145000, 160000, 180000, 210000, 240000, 280000];
  } else {
    document.getElementById("revenueVal").textContent = "₹52,40,000";
    document.getElementById("usersVal").textContent = "1,42,000";
    document.getElementById("ordersVal").textContent = "38,400";
    lineChart.data.datasets[0].data = [320000, 380000, 420000, 480000, 540000, 610000, 720000];
  }
  lineChart.update();
});

// Theme Toggle
document.getElementById("themeBtn").addEventListener("click", (e) => {
  document.body.classList.toggle("dark");
  e.target.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

renderOrders(orders);
renderTopProducts();