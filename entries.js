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
  const entriesList = document.getElementById('entries-list');  // Add this line

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
    console.log(entries);  // Add this line
    createNewEntry(newEntry);
    saveEntriesToLocalStorage();
  });  

  entriesPanelButton.addEventListener('click', () => {
    if(entriesPanel) {  // Add this line
      toggleEntriesPanel();
    }
  });

  entriesDeleteArea.addEventListener('drop', (event) => {
    const id = event.dataTransfer.getData('text/plain');
    if (!id) return;  // Add this line
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
        <span contenteditable="true" oninput="saveEntriesToLocalStorage()">${entry.text}</span>
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
  let savedEntries;
  try {
    savedEntries = JSON.parse(localStorage.getItem('entries') || "[]");
  } catch(e) {
    console.error("Error parsing entries from local storage:", e);
    savedEntries = [];
  }
  
  let entryOrder;
  try {
    entryOrder = JSON.parse(localStorage.getItem('entryOrder') || "[]");
  } catch(e) {
    console.error("Error parsing entry order from local storage:", e);
    entryOrder = [];
  }

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

const faBookIcon = document.getElementById('fa-book-icon');
const entriesPanel = document.getElementById('entries-panel');  // Move this line outside of the event listener

faBookIcon.addEventListener('click', () => {
  if(entriesPanel) {
    toggleEntriesPanel();
  }
});


function toggleEntriesPanel() {
  const entriesPanel = document.getElementById('entries-panel');
  const panelEntries = document.querySelectorAll('#entries-list .entry-item');
  const newEntryButton = document.querySelector('.new-entry-button');

  const isPanelOpen = getComputedStyle(entriesPanel).left === "0px";
  
  entriesPanel.style.left = isPanelOpen ? "-250px" : "0px";

  panelEntries.forEach(entry => {
    entry.style.opacity = isPanelOpen ? "1" : "1";
  });
  newEntryButton.style.opacity = isPanelOpen ? "1" : "1";
}

