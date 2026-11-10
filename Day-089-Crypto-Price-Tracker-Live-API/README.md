# Day 89 - Crypto Price Tracker

Live cryptocurrency price tracker using CoinGecko Public API.

## Features
- Live prices for Top 50 coins by market cap
- Search by coin name / symbol
- Currency switch: USD / INR / EUR
- 24h price change, Market Cap, Volume
- Auto refresh every 30 seconds
- No API key required

## Tech Used
- HTML, CSS, JavaScript
- CoinGecko API v3

## API Used
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1

## How to Run
1. Download all 4 files in same folder
2. Double click `index.html`
3. Or use VS Code Live Server

## Note
CoinGecko free API has rate limit. If it shows limit error, wait 1 minute and press Refresh.