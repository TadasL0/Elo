document.getElementById('toggle-dark-mode').addEventListener('change', function(event) {
    document.body.classList.toggle('dark-mode', event.target.checked);
});

const entryElement = document.getElementById('journal-entry');

entryElement.addEventListener('input', autosaveEntry);

// Load any saved entry from previous session
loadSavedEntry();

function autosaveEntry() {
  const entryContent = entryElement.innerHTML;
  localStorage.setItem('savedEntry', entryContent);
}

function loadSavedEntry() {
  const savedEntry = localStorage.getItem('savedEntry');

  if (savedEntry) {
    entryElement.innerHTML = savedEntry;
  }
}
