const seatsGrid = document.getElementById('seatsGrid');
const movieSelect = document.getElementById('movieSelect');
const countEl = document.getElementById('count');
const totalEl = document.getElementById('total');
const bookingList = document.getElementById('bookingList');

// LocalStorage se purani booked seats lao
let occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeats')) || [5, 6, 12, 13, 22, 30];
let myBookings = JSON.parse(localStorage.getItem('myBookings')) || [];

function save() {
  localStorage.setItem('occupiedSeats', JSON.stringify(occupiedSeats));
  localStorage.setItem('myBookings', JSON.stringify(myBookings));
}

// Dark Mode
if (localStorage.getItem('dark') === 'true') document.body.classList.add('dark');
document.getElementById('darkBtn').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('dark', document.body.classList.contains('dark'));
});

// 40 Seats banao - A1 to E8
for (let i = 0; i < 40; i++) {
  let seat = document.createElement('div');
  seat.classList.add('seat');
  seat.title = 'Seat ' + (i + 1);
  if (occupiedSeats.includes(i)) seat.classList.add('occupied');
  seat.addEventListener('click', () => {
    if (seat.classList.contains('occupied')) return;
    seat.classList.toggle('selected');
    updateSummary();
  });
  seatsGrid.appendChild(seat);
}

function updateSummary() {
  let selected = document.querySelectorAll('.seat.selected').length;
  let price = parseInt(movieSelect.value);
  countEl.innerText = selected;
  totalEl.innerText = selected * price;
}

movieSelect.addEventListener('change', updateSummary);

document.getElementById('bookBtn').addEventListener('click', () => {
  let name = document.getElementById('nameInput').value.trim() || 'Guest';
  let selectedSeats = [...document.querySelectorAll('.seat.selected')];
  if (selectedSeats.length === 0) return alert('Pehle seat toh select kar bhai!');

  let movieName = movieSelect.options[movieSelect.selectedIndex].text;
  let seatNumbers = selectedSeats.map(s => [...seatsGrid.children].indexOf(s) + 1);

  // Seats ko occupied kar do
  selectedSeats.forEach(s => {
    s.classList.remove('selected');
    s.classList.add('occupied');
    let index = [...seatsGrid.children].indexOf(s);
    occupiedSeats.push(index);
  });

  let booking = {
    name: name,
    movie: movieName,
    seats: seatNumbers.join(', '),
    total: seatNumbers.length * parseInt(movieSelect.value),
    time: new Date().toLocaleString()
  };

  myBookings.push(booking);
  save();
  renderBookings();
  updateSummary();
  alert(`Ho gaya bhai! 🎉\n${name} - ${movieName}\nSeats: ${seatNumbers.join(', ')}\nTotal: ₹${booking.total}`);
});

function renderBookings() {
  bookingList.innerHTML = '';
  if (myBookings.length === 0) {
    bookingList.innerHTML = '<li style="justify-content:center;opacity:0.6">Abhi koi booking nahi hai</li>';
    return;
  }
  myBookings.forEach((b, i) => {
    let li = document.createElement('li');
    li.innerHTML = `<span><b>${b.name}</b> - ${b.movie}<br>Seats: ${b.seats} | ₹${b.total}<br><small>${b.time}</small></span>
    <button onclick="cancelBooking(${i})">Cancel</button>`;
    bookingList.appendChild(li);
  });
}

function cancelBooking(i) {
  // Seat wapas free kar do
  let seatsToFree = myBookings[i].seats.split(', ').map(n => parseInt(n) - 1);
  occupiedSeats = occupiedSeats.filter(s => !seatsToFree.includes(s));
  // UI update
  seatsToFree.forEach(idx => {
    if (seatsGrid.children[idx]) seatsGrid.children[idx].classList.remove('occupied');
  });
  myBookings.splice(i, 1);
  save(); renderBookings();
}

document.getElementById('clearBtn').addEventListener('click', () => {
  if (!confirm('Sab booking delete kar du?')) return;
  myBookings = [];
  occupiedSeats = [5, 6, 12, 13, 22, 30];
  save(); location.reload();
});

renderBookings();
updateSummary();