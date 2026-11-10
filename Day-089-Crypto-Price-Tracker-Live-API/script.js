const coinTable = document.getElementById("coinTable");
const searchInput = document.getElementById("searchInput");
const currencySelect = document.getElementById("currencySelect");
const refreshBtn = document.getElementById("refreshBtn");
const statusEl = document.getElementById("status");
const totalCoinsEl = document.getElementById("totalCoins");
const lastUpdatedEl = document.getElementById("lastUpdated");

let allCoins = [];

async function fetchCoins() {
  const currency = currencySelect.value;
  statusEl.textContent = "Fetching live prices...";
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=false`
    );
    if (!res.ok) throw new Error("API limit");
    allCoins = await res.json();
    renderCoins(allCoins);
    statusEl.textContent = "Live ✅";
    totalCoinsEl.textContent = allCoins.length;
    lastUpdatedEl.textContent = new Date().toLocaleTimeString();
  } catch (err) {
    statusEl.textContent = "API limit hit. Wait 1 min and press Refresh.";
    console.error(err);
  }
}

function formatPrice(price, currency) {
  const symbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  return symbol + price.toLocaleString("en-IN", { maximumFractionDigits: price < 1 ? 4 : 2 });
}

function renderCoins(coins) {
  const currency = currencySelect.value;
  const query = searchInput.value.toLowerCase();
  const filtered = coins.filter(
    (c) => c.name.toLowerCase().includes(query) || c.symbol.toLowerCase().includes(query)
  );

  coinTable.innerHTML = filtered.map((coin, i) => `
    <tr>
      <td>${coin.market_cap_rank}</td>
      <td>
        <img src="${coin.image}" alt="${coin.name}" />
        <span class="coin-name">${coin.name}</span>
        <span class="coin-symbol">${coin.symbol}</span>
      </td>
      <td>${formatPrice(coin.current_price, currency)}</td>
      <td class="${coin.price_change_percentage_24h >= 0 ? "up" : "down"}">
        ${coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>${formatPrice(coin.market_cap, currency)}</td>
      <td>${formatPrice(coin.total_volume, currency)}</td>
    </tr>
  `).join("");

  if (filtered.length === 0) {
    coinTable.innerHTML = `<tr><td colspan="6" style="text-align:center">No coin found</td></tr>`;
  }
}

searchInput.addEventListener("input", () => renderCoins(allCoins));
currencySelect.addEventListener("change", fetchCoins);
refreshBtn.addEventListener("click", fetchCoins);

fetchCoins();
setInterval(fetchCoins, 30000);