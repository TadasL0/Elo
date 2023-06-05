const entries = [
  { id: 1, title: 'Latest Entry', content: '' },
  { id: 2, title: 'Entry 2', content: '' },
  { id: 3, title: 'Entry 3', content: '' }
];

const entryList = document.getElementById("entry-list");
let selectedEntryIndex = -1; // Index of the currently selected entry

const renderEntryList = () => {
  entryList.innerHTML = ""; // Clear the previous entries

  entries.forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("entry-item");

    if (index === selectedEntryIndex) {
      listItem.classList.add("selected");
    }

    const title = document.createElement("h3");
    title.classList.add("entry-title");
    title.textContent = entry.title;

    listItem.appendChild(title);

    listItem.addEventListener("click", () => {
      selectEntry(index);
    });

    entryList.appendChild(listItem);
  });
};

const selectEntry = (index) => {
  if (index === selectedEntryIndex) {
    return; // Already selected, no need to perform any action
  }

  const entryItems = document.querySelectorAll(".entry-item");
  if (selectedEntryIndex >= 0 && selectedEntryIndex < entryItems.length) {
    entryItems[selectedEntryIndex].classList.remove("selected");
  }

  selectedEntryIndex = index;

  if (selectedEntryIndex >= 0 && selectedEntryIndex < entryItems.length) {
    entryItems[selectedEntryIndex].classList.add("selected");

    const journalEntry = document.getElementById("journal-entry");
    journalEntry.value = entries[selectedEntryIndex].content || ""; // Set the textarea value to the selected entry's content
  }

  // Perform any additional actions when selecting an entry
  // For example, update the journal textarea with the selected entry's content
};


document.addEventListener("DOMContentLoaded", () => {
  renderEntryList(); // Render the initial entry list
});

// Handle the event when the textarea input changes
document.getElementById("journal-entry").addEventListener("input", (event) => {
  entries[selectedEntryIndex].content = event.target.value; // Update the content of the selected entry
});

// Implement any additional functionality as needed
