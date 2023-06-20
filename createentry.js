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
    this.journalEntry = document.getElementById('journal-entry');

    // Initialize Sortable on the entry-list
    new Sortable(this.entryList, {
      animation: 150,
      onUpdate: () => this.updateEntryOrder()
    });

    // Event listeners
    this.newEntryButton.addEventListener('click', () => this.createNewEntry());
    this.toggleButton.addEventListener('click', () => this.toggleSidePanel());
    this.journalEntry.addEventListener('input', (event) => this.updateEntryContent(event));
  }

  // Function to render the entry list
  renderEntryList() {
    this.entryList.innerHTML = '';
    this.entries.forEach((entry, index) => {
      const entryItem = document.createElement('li');
      entryItem.className = 'entry-item';
      entryItem.textContent = entry.title;
      entryItem.contentEditable = true; // make the entry title editable
      entryItem.addEventListener('blur', () => this.renameEntry(index, entryItem.textContent)); // save new name on blur
      entryItem.addEventListener('click', () => this.selectEntry(index));
      this.entryList.appendChild(entryItem);
    });
  }

  // Function to update the order of entries after sorting
  updateEntryOrder() {
    this.entries = Array.from(this.entryList.children).map((entryItem) => {
      const title = entryItem.textContent;
      const content = this.entries.find((entry) => entry.title === title).content;
      return new Entry(title, content);
    });
    this.saveEntriesToLocalStorage();
  }

  // Function to rename an entry
  renameEntry(index, newTitle) {
    this.entries[index].title = newTitle;
    this.saveEntriesToLocalStorage();
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

  // Function to update entry content
  updateEntryContent(event) {
    this.entries[this.selectedEntryIndex].content = event.target.value;
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
