console.log('Running sidepanel script');

// The entry model
class Entry {
  constructor(id = `entry-${Date.now()}`, text = 'Click to change this prompt.') {
    this.id = id;
    this.text = text;
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  const sidePanel = document.getElementById('side-panel');
  const sidePanelButton = document.getElementById('side-panel-button');
  const newEntryButton = document.querySelector('.new-entry-button');
  const deleteArea = document.getElementById('delete-area');
  
  let entries = loadEntriesFromLocalStorage();

  // Event listener for new entry button
  newEntryButton.addEventListener('click', () => {
    const newEntry = new Entry();
    entries.push(newEntry);
    createNewEntry(newEntry);
    saveEntriesToLocalStorage();
  });

  // Adjust the left property when the button is clicked
  sidePanelButton.addEventListener('click', () => {
    const panelEntries = document.querySelectorAll('#sortable-editable-list .sortable-item');
    if (sidePanel.style.left === "0px") {
      sidePanel.style.left = "-250px";
      setTimeout(() => {
        panelEntries.forEach(entry => {
          entry.style.opacity = "0";
        });
        newEntryButton.style.opacity = "0";
        deleteArea.style.opacity = "0";
      }, 200); 
    } else {
      sidePanel.style.left = "0px";
      setTimeout(() => {
        panelEntries.forEach(entry => {
          entry.style.opacity = "1";
        });
        newEntryButton.style.opacity = "1";
        deleteArea.style.opacity = "1";
      }, 200);
    }
  });

  // DOOM DELETION AREA!
  deleteArea.addEventListener('drop', (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain');
    const elementToRemove = document.getElementById(id);
    if (elementToRemove) {
      elementToRemove.remove();
      entries = entries.filter(entry => entry.id !== id);
      saveEntriesToLocalStorage();
    }
  });

  deleteArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  });

  // Initiate sortable
  Sortable.create(sortableEditableList, {
    animation: 150,
    onEnd: saveEntriesToLocalStorage
  });
});

// Function to create a new entry when the plus button is clicked
function createNewEntry(entry) {
  const entryList = document.getElementById('sortable-editable-list');
  const newEntryHTML = `
    <li id="${entry.id}" draggable="true" class="sortable-item" ondragstart="drag(event)">
      <span class="drag-handle"></span> <span contenteditable="true">${entry.text}</span>
    </li>
  `;
  entryList.insertAdjacentHTML('beforeend', newEntryHTML);
}

// Function for the drag event
function drag(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}

// Function to load entries from local storage
function loadEntriesFromLocalStorage() {
  const savedEntries = JSON.parse(localStorage.getItem('entries') || "[]");
  const entryList = document.getElementById('sortable-editable-list');
  entryList.innerHTML = '';
  savedEntries.forEach(entry => {
    createNewEntry(entry);
  });
  return savedEntries;
}

// Initiate sortable
const sortableEditableLists = Array.from(document.querySelectorAll('.sortable-editable-list'));

sortableEditableLists.forEach((sortableEditableList) => {
  Sortable.create(sortableEditableList, {
    animation: 150,
    onEnd: saveEntriesToLocalStorage,
  });
});


// Function to save entries to local storage
function saveEntriesToLocalStorage() {
  const entryListItems = document.querySelectorAll('#sortable-editable-list .sortable-item');
  const entriesToSave = Array.from(entryListItems).map(entryListItem => {
    return new Entry(entryListItem.id, entryListItem.querySelector('span[contenteditable]').innerText);
  });
  localStorage.setItem('entries', JSON.stringify(entriesToSave));
}
