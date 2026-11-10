# Day 50 - QR Code Generator 🔲 (50% Milestone!)

A feature-rich QR code generator supporting Text, URL, WiFi & Email.

## Features
- 4 Types: Text / URL / WiFi / Email
- Custom size (100-500px)
- Custom foreground & background colors
- High error correction (H level)
- Live preview
- Download as PNG
- Share API + Print
- Responsive glassmorphism UI

## Tech Stack
- QRCode.js (https://github.com/davidshimjs/qrcodejs)
- HTML5 Canvas / IMG
- Vanilla JavaScript
- CSS Glassmorphism

## QR Formats
- WiFi: `WIFI:T:WPA;S:SSID;P:password;;`
- Email: `mailto:to?subject=&body=`
- URL/Text: plain text

## How to Run
Open `index.html`. No build needed.
Ctrl+Enter to quickly generate.

## How it Works
1. Get input based on tab
2. Create new QRCode instance with colorDark/Light and size
3. Canvas is auto-generated inside #qr
4. Download via toDataURL or img src

## Day 50 of 100 Days of Code - Halfway there! 🎉