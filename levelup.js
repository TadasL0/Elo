function updateEntry() {
    const textarea = document.getElementById('journal-entry');
    const currentEntry = entries.find(entry => entry.id === currentEntryId);
    if (currentEntry) {
      currentEntry.content = textarea.value;
      increaseXP(textarea.value.length); // Added this line
      saveEntriesToLocalStorage();
    }
  }
  
  function increaseXP(points) {
    let xp = loadXPFromLocalStorage();
    xp += points;
    document.getElementById('progress-bar').value = xp % 1000;
    document.getElementById('xp-bar').innerText = `Level ${Math.floor(xp / 1000) + 1}: `;
    saveXPToLocalStorage(xp);
  }
  
  function loadXPFromLocalStorage() {
    return parseInt(localStorage.getItem('xp') || "0");
  }
  
  function saveXPToLocalStorage(xp) {
    localStorage.setItem('xp', xp.toString());
  }

  window.onload = function() {
    entries = loadEntriesFromLocalStorage();
    const xp = loadXPFromLocalStorage();
    document.getElementById('progress-bar').value = xp % 1000;
    document.getElementById('xp-bar').innerText = `Level ${Math.floor(xp / 1000) + 1}: `;
  
    const addEntryButton = document.querySelector('.new-entry-button');
    addEntryButton.addEventListener('click', addNewEntry);
  
    const textarea = document.getElementById('journal-entry');
    textarea.addEventListener('input', updateEntry);
  
    const entriesPanelButton = document.getElementById('entries-panel-button');
    entriesPanelButton.addEventListener('click', toggleEntriesPanel);
  };
  
  function updateXPBar(xp) {
    const xpBar = document.getElementById('xp-bar');
    xpBar.style.width = `${xp}%`;  /* This assumes xp is a percentage */
  }
  