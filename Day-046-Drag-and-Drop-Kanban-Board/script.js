const board = document.getElementById('board');
const modal = document.getElementById('modal');
const taskTitle = document.getElementById('taskTitle');
const taskDesc = document.getElementById('taskDesc');
let currentColumn = 'todo';
let tasks = JSON.parse(localStorage.getItem('kanban-tasks')) || {
  todo: [{id:1, title:"Design Landing Page", desc:"Create wireframe"}],
  progress: [{id:2, title:"Build API", desc:"REST endpoints"}],
  done: [{id:3, title:"Setup Project", desc:"Initial commit done"}]
};

function save() {
  localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  render();
}

function render() {
  Object.keys(tasks).forEach(col => {
    const container = document.getElementById(col);
    if(!container) return;
    container.innerHTML = '';
    tasks[col].forEach(task => {
      const div = document.createElement('div');
      div.className = 'task';
      div.draggable = true;
      div.dataset.id = task.id;
      div.dataset.status = col;
      div.innerHTML = `
        <h4>${task.title}</h4>
        <p>${task.desc || ''}</p>
        <div class="task-footer">
          <small>#${task.id}</small>
          <button class="delete" onclick="deleteTask('${col}', ${task.id})">Delete</button>
        </div>
      `;
      addDragEvents(div);
      container.appendChild(div);
    });
    // update count
    const colEl = container.closest('.column');
    if(colEl) colEl.querySelector('.count').textContent = tasks[col].length;
  });
}

function addDragEvents(task) {
  task.addEventListener('dragstart', e => {
    task.classList.add('dragging');
    e.dataTransfer.setData('text/plain', JSON.stringify({
      id: task.dataset.id,
      from: task.dataset.status
    }));
  });
  task.addEventListener('dragend', () => task.classList.remove('dragging'));
}

document.querySelectorAll('.tasks').forEach(col => {
  col.addEventListener('dragover', e => {
    e.preventDefault();
    col.parentElement.classList.add('drag-over');
  });
  col.addEventListener('dragleave', () => col.parentElement.classList.remove('drag-over'));
  col.addEventListener('drop', e => {
    e.preventDefault();
    col.parentElement.classList.remove('drag-over');
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const toStatus = col.id;
    const fromStatus = data.from;
    if(fromStatus === toStatus) return;
    
    const taskIndex = tasks[fromStatus].findIndex(t => t.id == data.id);
    if(taskIndex > -1) {
      const [moved] = tasks[fromStatus].splice(taskIndex, 1);
      tasks[toStatus].push(moved);
      save();
    }
  });
});

// Add task
document.querySelectorAll('.add-task').forEach(btn => {
  btn.addEventListener('click', () => {
    currentColumn = btn.dataset.target;
    document.getElementById('modalTitle').textContent = `Add to ${currentColumn}`;
    modal.classList.remove('hidden');
    taskTitle.focus();
  });
});

document.getElementById('cancelBtn').addEventListener('click', () => {
  modal.classList.add('hidden');
  taskTitle.value = ''; taskDesc.value = '';
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const title = taskTitle.value.trim();
  if(!title) return alert('Enter title');
  const newTask = { id: Date.now(), title, desc: taskDesc.value.trim() };
  if(!tasks[currentColumn]) tasks[currentColumn] = [];
  tasks[currentColumn].push(newTask);
  modal.classList.add('hidden');
  taskTitle.value = ''; taskDesc.value = '';
  save();
});

window.deleteTask = (col, id) => {
  tasks[col] = tasks[col].filter(t => t.id !== id);
  save();
};

modal.addEventListener('click', e => {
  if(e.target === modal) modal.classList.add('hidden');
});

render();