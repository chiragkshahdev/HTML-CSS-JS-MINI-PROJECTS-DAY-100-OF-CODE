const wordInput = document.getElementById('wordInput');
const searchBtn = document.getElementById('searchBtn');
const resultEl = document.getElementById('result');

async function searchWord(word){
  if(!word) return;
  resultEl.innerHTML = '<p>Loading...</p>';
  
  try{
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    
    if(!res.ok){
      resultEl.innerHTML = `<p style="color:#ff7675">❌ No meaning found for "${word}"</p>`;
      return;
    }
    
    const data = await res.json();
    const entry = data[0];
    
    let html = `<h2>${entry.word} 
      ${entry.phonetics[0]?.audio ? `<button class="audioBtn" onclick="new Audio('${entry.phonetics[0].audio}').play()">🔊</button>` : ''}
    </h2>`;
    
    html += `<p class="phonetic">${entry.phonetic || entry.phonetics[0]?.text || ''}</p>`;
    
    entry.meanings.forEach(m => {
      html += `<div class="meaning">
        <h4>${m.partOfSpeech}</h4>
        <p><b>Definition:</b> ${m.definitions[0].definition}</p>
        ${m.definitions[0].example ? `<p class="example">"${m.definitions[0].example}"</p>` : ''}
        ${m.definitions[0].synonyms?.length ? `<p>Synonyms: ${m.definitions[0].synonyms.slice(0,5).join(', ')}</p>` : ''}
      </div>`;
    });
    
    resultEl.innerHTML = html;
    
  } catch(err){
    resultEl.innerHTML = `<p>Error: Check internet</p>`;
  }
}

searchBtn.addEventListener('click', ()=> searchWord(wordInput.value.trim()));
wordInput.addEventListener('keypress', e=> {
  if(e.key === 'Enter') searchWord(wordInput.value.trim());
});