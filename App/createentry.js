// The entry model
class Entry {
  constructor(title = 'New Entry', content = '') {
    this.title = title;
    this.content = content;
  }
}

// The journal model
class Journal {
  constructor() {
    this.entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    this.selectedEntryIndex = null;
    this.getDomElements();
    this.renderEntryList();

    if (this.entries.length > 0) {
      this.selectEntry(0); // Select the first entry by default
    } else {
      this.createNewEntry(); // Create a new entry if the list is empty
    }
  }

  getDomElements() {
    this.entryList = document.getElementById('entry-list');
    this.toggleButton = document.querySelector('.toggle-button');
    this.sidePanel = document.getElementById('side-panel');
    this.newEntryButton = document.querySelector('.new-entry-button');
    this.entryTitle = document.getElementById('entry-title');
    this.journalEntry = document.getElementById('journal-entry');

    // Event listeners
    this.newEntryButton.addEventListener('click', () => this.createNewEntry());
    this.toggleButton.addEventListener('click', () => this.toggleSidePanel());
    this.entryTitle.addEventListener('click', () => this.editTitle());
    this.journalEntry.addEventListener('input', (event) => this.updateEntryContent(event));
  }

  // Function to render the entry list
  renderEntryList() {
    this.entryList.innerHTML = '';
    this.entries.forEach((entry, index) => {
      const entryItem = document.createElement('li');
      entryItem.className = 'entry-item';
      entryItem.textContent = entry.title;
      entryItem.addEventListener('click', () => this.selectEntry(index));
      this.entryList.appendChild(entryItem);
    });
  }

  // Function to select an entry
  selectEntry(index) {
    this.selectedEntryIndex = index;
    this.entries.forEach((entry, i) => {
      const entryItem = this.entryList.children[i];
      if (i === index) {
        entryItem.classList.add('selected');
      } else {
        entryItem.classList.remove('selected');
      }
    });

    const selectedEntry = this.entries[this.selectedEntryIndex];
    this.entryTitle.textContent = selectedEntry.title;
    this.journalEntry.value = selectedEntry.content;
  }

  // Function to create a new entry
  createNewEntry() {
    this.entries.push(new Entry());
    this.saveEntriesToLocalStorage();
    this.renderEntryList();
    this.selectEntry(this.entries.length - 1);
  }

  // Function to save entries to local storage
  saveEntriesToLocalStorage() {
    localStorage.setItem('journalEntries', JSON.stringify(this.entries));
  }

  // Function to edit title
  editTitle() {
    const selectedEntry = this.entries[this.selectedEntryIndex];

    // Add editable class to make the title editable
    this.entryTitle.contentEditable = true;
    this.entryTitle.classList.add('editable');

    // Save the updated title when the user focuses out of the element
    this.entryTitle.addEventListener('focusout', () => {
      selectedEntry.title = this.entryTitle.textContent;
      this.entryTitle.contentEditable = false;
      this.entryTitle.classList.remove('editable');
      this.saveEntriesToLocalStorage();
    });
  }

  // Function to update entry content
  updateEntryContent(event) {
    this.entries[this.selectedEntryIndex].content = event.target.value; // Update the content of the selected entry
    this.saveEntriesToLocalStorage();
  }

  // Function to toggle side panel
  toggleSidePanel() {
    this.sidePanel.classList.toggle('show-panel');
    const entryItems = document.getElementsByClassName('entry-item');
    for (let item of entryItems) {
      item.classList.toggle('entry-visible');
    }
  }
}

// Start the journal app
new Journal();
