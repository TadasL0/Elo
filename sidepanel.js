console.log('Running sidepanel script');

window.addEventListener("DOMContentLoaded", (event) => {
  const sidePanel = document.getElementById('side-panel');
  const sidePanelButton = document.getElementById('side-panel-button');
  const newEntryButton = document.querySelector('.new-entry-button');

  loadEntriesFromLocalStorage();

  // Adjust the left property when the button is clicked
  sidePanelButton.addEventListener('click', () => {
    const panelEntries = document.querySelectorAll('#entry-list li');
    if (sidePanel.style.left === "0px") {
      sidePanel.style.left = "-250px";
      setTimeout(() => {
        panelEntries.forEach(entry => {
          entry.style.opacity = "0";
        });
        newEntryButton.style.opacity = "0";
      }, 200); 
    } else {
      sidePanel.style.left = "0px";
      setTimeout(() => {
        panelEntries.forEach(entry => {
          entry.style.opacity = "1";
        });
        newEntryButton.style.opacity = "1";
      }, 200);
    }
  });
});

// Function to create a new entry when the plus button is clicked
function createNewEntry() {
  const entryList = document.getElementById('sortable-editable-list');
  if (!entryList) {
      console.error('Could not find sortable-editable-list element');
      return;
  }

  const newEntry = document.createElement('li');
  newEntry.classList.add('sortable-item');
  newEntry.setAttribute('draggable', 'true'); // This is new
  newEntry.addEventListener('dragstart', (event) => { // This is new
    event.dataTransfer.setData('text/plain', newEntry.id);
  });

  const newEntryText = document.createElement('span');
  newEntryText.classList.add('editable-text');
  newEntryText.setAttribute('contenteditable', 'true');
  newEntryText.innerText = 'New entry';

  newEntry.appendChild(newEntryText);
  entryList.appendChild(newEntry);

  // Add event listener for double click to start editing
  newEntryText.addEventListener('dblclick', (event) => {
    event.target.setAttribute('contenteditable', 'true');
  });

  // Add event listener for enter key to stop editing
  newEntryText.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.setAttribute('contenteditable', 'false');
      // Save entries to local storage whenever an entry is finished being edited
      saveEntriesToLocalStorage();
    }
  });
  
  // Save entries to local storage whenever a new entry is created
  saveEntriesToLocalStorage();
}

function saveEntriesToLocalStorage() {
  const entryList = document.getElementById('sortable-editable-list');
  const entries = Array.from(entryList.querySelectorAll('li'));
  const entriesData = entries.map(entry => {
    return { id: entry.id, innerText: entry.innerText };
  });
  localStorage.setItem('entries', JSON.stringify(entriesData));
}

function loadEntriesFromLocalStorage() {
  const entriesData = JSON.parse(localStorage.getItem('entries'));
  if (entriesData) {
    entriesData.forEach(entryData => {
      const newEntry = document.createElement('li');
      newEntry.classList.add('sortable-item');
      newEntry.id = entryData.id;
      newEntry.setAttribute('draggable', 'true'); // This is new
      newEntry.addEventListener('dragstart', (event) => { // This is new
        event.dataTransfer.setData('text/plain', newEntry.id);
      });

      const newEntryText = document.createElement('span');
      newEntryText.classList.add('editable-text');
      newEntryText.setAttribute('contenteditable', 'true');
      newEntryText.innerText = entryData.innerText;

      newEntry.appendChild(newEntryText);
      const entryList = document.getElementById('sortable-editable-list');
      entryList.appendChild(newEntry);
    });
  }
}

// DOOM DELETION AREA!
const deleteArea = document.getElementById('delete-area');

deleteArea.addEventListener('drop', (event) => {
  event.preventDefault();
  const id = event.dataTransfer.getData('text/plain');
  const elementToRemove = document.getElementById(id);
  if (elementToRemove) {
    elementToRemove.remove();
    // Save entries to local storage whenever an entry is deleted
    saveEntriesToLocalStorage();
  }
});

deleteArea.addEventListener('dragover', (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
});
