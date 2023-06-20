console.log('Running sidepanel script');

window.addEventListener("DOMContentLoaded", (event) => {
  const sidePanel = document.getElementById('side-panel');
  const sidePanelButton = document.getElementById('side-panel-button');
  const newEntryButton = document.querySelector('.new-entry-button');
  
  const entryList = document.getElementById('sortable-editable-list');
  const deleteArea = document.getElementById('delete-area');

  loadEntriesFromLocalStorage();

  // Event listener for new entry button
  newEntryButton.addEventListener('click', createNewEntry);

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

  // DOOM DELETION AREA!
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

  // Initiate sortable
  Sortable.create(entryList, {
    animation: 150,
    onEnd: saveEntriesToLocalStorage
  });
});

// Function to create a new entry when the plus button is clicked
function createNewEntry() {
  const entryList = document.getElementById('sortable-editable-list');
  const newEntryId = `entry-${Date.now()}`;

  const newEntry = document.createElement('li');
  newEntry.classList.add('sortable-item');
  newEntry.setAttribute('draggable', 'true');
  newEntry.setAttribute('id', newEntryId);
  
  const newEntryText = document.createElement('span');
  newEntryText.classList.add('editable-text');
  newEntryText.setAttribute('contenteditable', 'true');
  newEntryText.innerText = 'New entry';

  newEntry.appendChild(newEntryText);
  entryList.appendChild(newEntry);

  // Event listener for editing
  newEntryText.addEventListener('dblclick', startEditing);
  newEntryText.addEventListener('blur', stopEditing);
  newEntryText.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      stopEditing(event);
    }
  });
  
  // Save entries to local storage whenever a new entry is created
  saveEntriesToLocalStorage();
}

function startEditing(event) {
  event.target.setAttribute('contenteditable', 'true');
}

function stopEditing(event) {
  event.target.setAttribute('contenteditable', 'false');
  saveEntriesToLocalStorage();
}

function saveEntriesToLocalStorage() {
  const entryList = document.getElementById('sortable-editable-list');
  const entries = Array.from(entryList.querySelectorAll('li'));
  const entriesData = entries.map((entry, index) => {
    return { id: entry.id, innerText: entry.innerText, order: index };
  });
  localStorage.setItem('entries', JSON.stringify(entriesData));
}

function loadEntriesFromLocalStorage() {
  const entriesData = JSON.parse(localStorage.getItem('entries'));
  if (entriesData) {
    const entryList = document.getElementById('sortable-editable-list');
    entriesData.sort((a, b) => a.order - b.order).forEach(entryData => {
      const newEntry = document.createElement('li');
      newEntry.classList.add('sortable-item');
      newEntry.setAttribute('draggable', 'true');
      newEntry.setAttribute('id', entryData.id);
      
      const newEntryText = document.createElement('span');
      newEntryText.classList.add('editable-text');
      newEntryText.setAttribute('contenteditable', 'true');
      newEntryText.innerText = entryData.innerText;

      newEntry.appendChild(newEntryText);
      entryList.appendChild(newEntry);

      // Event listener for editing
      newEntryText.addEventListener('dblclick', startEditing);
      newEntryText.addEventListener('blur', stopEditing);
      newEntryText.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          stopEditing(event);
        }
      });
    });
  }
}
