class Entry {
  constructor(id = `entry-${Date.now()}`, text = 'Click to edit this entry.', content = '') {
    this.id = id;
    this.text = text;
    this.content = content;
  }
}

let entries = [];
let currentEntryId = null;

window.addEventListener('load', function() {
  entries = loadEntriesFromLocalStorage();

  const addEntryButton = document.querySelector('.new-entry-button');
  addEntryButton.addEventListener('click', addNewEntry);

  const textarea = document.getElementById('journal-entry');
  textarea.addEventListener('input', autosaveEntry);

  const entriesPanelButton = document.getElementById('entries-panel-button');
  entriesPanelButton.addEventListener('click', toggleEntriesPanel);
});

function addNewEntry() {
  const entry = new Entry();
  entries.push(entry);
  createNewEntry(entry);
  saveEntriesToLocalStorage();
}

function createNewEntry(entry) {
  const entryList = document.getElementById('entries-list');
  const newEntryHTML = `
    <li id="${entry.id}" class="entry-item" data-id="${entry.id}">
      <div>
        <span class="drag-handle"></span>
        <span contenteditable="true">${entry.text}</span>
      </div>
    </li>
  `;
  entryList.insertAdjacentHTML('beforeend', newEntryHTML);
  const newEntryElement = document.getElementById(entry.id);
  newEntryElement.addEventListener('click', () => {
    const textarea = document.getElementById('journal-entry');
    textarea.value = entry.content;
    currentEntryId = entry.id;
  });
}

function autosaveEntry() {
  const textarea = document.getElementById('journal-entry');
  const currentEntry = entries.find(entry => entry.id === currentEntryId);
  if (currentEntry) {
    currentEntry.content = textarea.value;
    saveEntriesToLocalStorage();
  }
}

function loadEntriesFromLocalStorage() {
  const savedEntries = JSON.parse(localStorage.getItem('entries') || "[]");
  savedEntries.forEach(savedEntry => {
    createNewEntry(new Entry(savedEntry.id, savedEntry.text, savedEntry.content));
  });
  return savedEntries;
}

function saveEntriesToLocalStorage() {
  const entryListItems = document.querySelectorAll('#entries-list .entry-item');
  const entriesToSave = Array.from(entryListItems).map(entryListItem => {
    const entryId = entryListItem.id;
    const entryText = entryListItem.querySelector('span[contenteditable]').innerText;
    const entryContent = entries.find(entry => entry.id === entryId)?.content;
    return new Entry(entryId, entryText, entryContent);
  });
  localStorage.setItem('entries', JSON.stringify(entriesToSave));
}

function removeEntry(id) {
  entries = entries.filter(entry => entry.id !== id);
  saveEntriesToLocalStorage();
}

function toggleEntriesPanel() {
  const entriesPanel = document.getElementById('entries-panel');
  entriesPanel.classList.toggle('entries-panel-hidden');
  entriesPanel.classList.toggle('entries-panel-visible');
}
