const container = document.getElementById('notesContainer');
const addBtn = document.getElementById('addBtn');

// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem('stickyNotes')) || [];

function saveNotes(){
  localStorage.setItem('stickyNotes', JSON.stringify(notes));
}

function createNoteElement(id, text, date){
  const div = document.createElement('div');
  div.className = 'note';
  div.innerHTML = `
    <button class="delete-btn">x</button>
    <textarea placeholder="Write something...">${text}</textarea>
    <div class="date">${date}</div>
  `;
  
  const textarea = div.querySelector('textarea');
  const delBtn = div.querySelector('.delete-btn');

  textarea.addEventListener('input', ()=>{
    notes = notes.map(n => n.id === id ? {...n, text: textarea.value} : n);
    saveNotes();
  });

  delBtn.addEventListener('click', ()=>{
    notes = notes.filter(n => n.id !== id);
    saveNotes();
    div.remove();
  });

  return div;
}

function renderNotes(){
  container.innerHTML = '';
  notes.forEach(n => {
    container.appendChild(createNoteElement(n.id, n.text, n.date));
  });
}

addBtn.addEventListener('click', ()=>{
  const newNote = {
    id: Date.now(),
    text: '',
    date: new Date().toLocaleDateString()
  };
  notes.push(newNote);
  saveNotes();
  container.appendChild(createNoteElement(newNote.id, '', newNote.date));
});

renderNotes();