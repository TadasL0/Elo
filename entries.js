class Entry {
  constructor(id = `entry-${Date.now()}`, text = 'Click to change this prompt.', content = '') {
    this.id = id;
    this.text = text;
    this.content = content;
  }
}

let entries = [];
let currentEntryId = null;

window.onload = function() {
  entries = loadEntriesFromLocalStorage();

  const addEntryButton = document.getElementById('add-entry-button');
  addEntryButton.addEventListener('click', addNewEntry);

  const textarea = document.getElementById('journal-entry');
  textarea.addEventListener('input', autosaveEntry);
};

function addNewEntry() {
  const entry = new Entry();
  entries.push(entry);
  createNewEntry(entry);
  saveEntriesToLocalStorage();
}

function createNewEntry(entry) {
  const entryList = document.getElementById('entries-list');
  const newEntryHTML = `
    <li id="${entry.id}" draggable="true" class="entry-item" ondragstart="drag(event)" data-id="${entry.id}">
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

// Implement the drag and drop functions
function drag(event) {
  const entryItem = event.target.closest('.entry-item');
  event.dataTransfer.setData('text', entryItem.id);
  // Temporarily disable contentEditable during drag operation
  entryItem.querySelector('span[contenteditable]').contentEditable = false;
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData('text');
  event.target.appendChild(document.getElementById(data));
  // Re-enable contentEditable after drop operation
  document.getElementById(data).querySelector('span[contenteditable]').contentEditable = true;
}
