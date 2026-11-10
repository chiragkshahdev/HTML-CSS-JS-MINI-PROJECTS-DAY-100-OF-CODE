const titleEl = document.getElementById('title');
const contentEl = document.getElementById('content');
const saveBtn = document.getElementById('saveBtn');
const notesEl = document.getElementById('notes');
const searchEl = document.getElementById('search');

let notes = JSON.parse(localStorage.getItem('notes37')) || [];

function save(){
  localStorage.setItem('notes37', JSON.stringify(notes));
}

function render(filter=''){
  notesEl.innerHTML = '';
  const filtered = notes.filter(n => 
    n.title.toLowerCase().includes(filter.toLowerCase()) || 
    n.content.toLowerCase().includes(filter.toLowerCase())
  );
  
  filtered.forEach((note, index) => {
    const div = document.createElement('div');
    div.className = 'note-card';
    div.innerHTML = `
      <button class="delete">x</button>
      <h3>${note.title || 'No Title'}</h3>
      <p>${note.content}</p>
      <small>${note.date}</small>
    `;
    div.querySelector('.delete').addEventListener('click', ()=>{
      notes.splice(notes.indexOf(note),1);
      save();
      render(searchEl.value);
    });
    notesEl.appendChild(div);
  });
}

saveBtn.addEventListener('click', ()=>{
  if(!contentEl.value.trim()) return alert('Write something');
  
  notes.unshift({
    title: titleEl.value,
    content: contentEl.value,
    date: new Date().toLocaleString()
  });
  save();
  render();
  titleEl.value = '';
  contentEl.value = '';
});

searchEl.addEventListener('input', ()=>{
  render(searchEl.value);
});

render();