let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'All';
let searchText = '';

const listEl = document.getElementById('list');
const countEl = document.getElementById('count');

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function toggleDark() {
  document.body.classList.toggle('dark');
  localStorage.setItem('dark', document.body.classList.contains('dark'));
}

// Dark mode load
if (localStorage.getItem('dark') === 'true') {
  document.body.classList.add('dark');
}

document.getElementById('darkBtn').addEventListener('click', toggleDark);

document.getElementById('addBtn').addEventListener('click', () => {
  let text = document.getElementById('taskInput').value.trim();
  let cat = document.getElementById('catInput').value;
  let priority = document.getElementById('priorityInput').value;
  if (!text) return alert('Pehle kaam toh likh bhai!');
  todos.push({ text, cat, priority, done: false });
  document.getElementById('taskInput').value = '';
  save(); render();
});

document.getElementById('searchInput').addEventListener('input', (e) => {
  searchText = e.target.value.toLowerCase();
  render();
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  });
});

function render() {
  listEl.innerHTML = '';
  let filtered = todos.filter(t =>
    (currentFilter === 'All' || t.cat === currentFilter) &&
    t.text.toLowerCase().includes(searchText)
  );

  filtered.forEach((t) => {
    let realIndex = todos.indexOf(t);
    let li = document.createElement('li');
    if (t.done) li.classList.add('done');
    li.innerHTML = `
      <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleDone(${realIndex})">
      <span class="task-text">${t.text} <span class="tag ${t.cat}">${t.cat}</span> <small>${t.priority}</small></span>
      <button class="del-btn" onclick="deleteTodo(${realIndex})">X</button>
    `;
    listEl.appendChild(li);
  });

  countEl.innerText = `Total: ${todos.length} | Done: ${todos.filter(t => t.done).length} | Showing: ${filtered.length}`;
}

function toggleDone(i) { todos[i].done = !todos[i].done; save(); render(); }
function deleteTodo(i) { todos.splice(i, 1); save(); render(); }

render();