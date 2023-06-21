console.log('Running entries script');

class Entry {
  constructor(id = `entry-${Date.now()}`, text = 'Click to change this prompt.') {
    this.id = id;
    this.text = text;
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  const entriesPanel = document.getElementById('entries-panel');
  const entriesPanelButton = document.getElementById('entries-panel-button');
  const newEntryButton = document.querySelector('.new-entry-button');
  const entriesDeleteArea = document.getElementById('entries-delete-area');
  
  let entries = loadEntriesFromLocalStorage();

  newEntryButton.addEventListener('click', () => {
    const newEntry = new Entry();
    entries.push(newEntry);
    createNewEntry(newEntry);
    saveEntriesToLocalStorage();
  });

  entriesPanelButton.addEventListener('click', () => {
    const panelEntries = document.querySelectorAll('#entries-list .entry-item');
    if (entriesPanel.style.left === "0px") {
      entriesPanel.style.left = "-250px";
      setTimeout(() => {
        panelEntries.forEach(entry => {
          entry.style.opacity = "0";
        });
        newEntryButton.style.opacity = "0";
      }, 200); 
    } else {
      entriesPanel.style.left = "0px";
      setTimeout(() => {
        panelEntries.forEach(entry => {
          entry.style.opacity = "1";
        });
        newEntryButton.style.opacity = "1";
      }, 200);
    }
  });

  entriesDeleteArea.addEventListener('drop', (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain');
    const elementToRemove = document.getElementById(id);
    if (elementToRemove) {
      elementToRemove.remove();
      entries = entries.filter(entry => entry.id !== id);
      saveEntriesToLocalStorage();
    }
  });

  entriesDeleteArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  });

  Sortable.create(document.getElementById('entries-list'), {
    animation: 150,
    onEnd: saveEntriesToLocalStorage
  });
});

function createNewEntry(entry) {
  const entryList = document.getElementById('entries-list');
  const newEntryHTML = `
    <li id="${entry.id}" draggable="true" class="entry-item" ondragstart="drag(event)">
      <span class="drag-handle"></span> <span contenteditable="true">${entry.text}</span>
    </li>
  `;
  entryList.insertAdjacentHTML('beforeend', newEntryHTML);
}

function drag(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}

function loadEntriesFromLocalStorage() {
  const savedEntries = JSON.parse(localStorage.getItem('entries') || "[]");
  const entryList = document.getElementById('entries-list');
  entryList.innerHTML = '';
  savedEntries.forEach(entry => {
    createNewEntry(entry);
  });
  return savedEntries;
}

function saveEntriesToLocalStorage() {
  const entryListItems = document.querySelectorAll('#entries-list .entry-item');
  const entriesToSave = Array.from(entryListItems).map(entryListItem => {
    return new Entry(entryListItem.id, entryListItem.querySelector('span[contenteditable]').innerText);
  });
  localStorage.setItem('entries', JSON.stringify(entriesToSave));
}

// Function to update placeholder text
function updatePlaceholderText() {
  const textarea = document.querySelector("#journal-entry");
  if (entries.length > 0) {
    const randomIndex = Math.floor(Math.random() * entries.length);
    const randomEntry = entries[randomIndex];
    textarea.placeholder = randomEntry.text;
  }
}

// Set an interval to update placeholder text every 5 seconds
setInterval(updatePlaceholderText, 5000);
