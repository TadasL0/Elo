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

  Sortable.create(entriesList, {
    animation: 150,
    onEnd: () => {
      const entryOrderArray = Array.from(entriesList.children).map(li => li.id);
      localStorage.setItem('entryOrder', JSON.stringify(entryOrderArray));
      saveEntriesToLocalStorage();
    }
  });

  newEntryButton.addEventListener('click', () => {
    const newEntry = new Entry();
    entries.push(newEntry);
    createNewEntry(newEntry);
    saveEntriesToLocalStorage();
  });

  entriesPanelButton.addEventListener('click', () => {
    toggleEntriesPanel();
  });

  entriesDeleteArea.addEventListener('drop', (event) => {
    const id = event.dataTransfer.getData('text/plain');
    removeEntryById(id);
  });

  entriesDeleteArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  });

  setInterval(updatePlaceholderText, 5000);
});

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
}

function drag(event) {
  let target = event.target;
  while (target && target.nodeName !== "LI") {
    target = target.parentNode;
  }
  if (!target) return;
  event.stopPropagation();
  event.dataTransfer.setData('text/plain', target.id);
}

function loadEntriesFromLocalStorage() {
  const savedEntries = JSON.parse(localStorage.getItem('entries') || "[]");
  const entryOrder = JSON.parse(localStorage.getItem('entryOrder') || []);
  
  savedEntries.sort((a, b) => {
    const indexA = entryOrder.indexOf(a.id);
    const indexB = entryOrder.indexOf(b.id);
    if (indexA === -1 || indexB === -1) {
      return 0;
    } else {
      return indexA - indexB;
    }
  });

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

function removeEntryById(id) {
  const elementToRemove = document.getElementById(id);
  if (elementToRemove) {
    elementToRemove.remove();
    entries = entries.filter(entry => entry.id !== id);
    saveEntriesToLocalStorage();
  }
}

function updatePlaceholderText() {
  const textarea = document.querySelector("#journal-entry");
  if (entries?.length > 0) {
    const randomIndex = Math.floor(Math.random() * entries.length);
    const randomEntry = entries[randomIndex];
    textarea.placeholder = randomEntry.text;
  }
}

function toggleEntriesPanel() {
  const entriesPanel = document.getElementById('entries-panel');
  const panelEntries = document.querySelectorAll('#entries-list .entry-item');
  const newEntryButton = document.querySelector('.new-entry-button');
  
  const isPanelOpen = entriesPanel.style.left === "0px";

  entriesPanel.style.left = isPanelOpen ? "-300px" : "0px";
  setTimeout(() => {
    panelEntries.forEach(entry => {
      entry.style.opacity = isPanelOpen ? "0" : "1";
    });
    newEntryButton.style.opacity = isPanelOpen ? "0" : "1";
  }, 200);
}
