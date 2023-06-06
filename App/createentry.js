const entries = [
  { id: 1, title: 'Latest Entry', content: '' },
  { id: 2, title: 'Default', content: '' },
  { id: 3, title: 'Default New', content: '' }
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

  // Retrieve entry texts and labels from local storage
  entries.forEach((entry, index) => {
    const savedContent = localStorage.getItem(`content_${entry.id}`);
    if (savedContent !== null) {
      entry.content = savedContent;
    }

    const savedTitle = localStorage.getItem(`title_${entry.id}`);
    if (savedTitle !== null) {
      entry.title = savedTitle;
    }
  });

  // Update the entry list and selected entry
  renderEntryList();
  selectEntry(selectedEntryIndex);
});

// Handle the event when the textarea input changes
document.getElementById("journal-entry").addEventListener("input", (event) => {
  entries[selectedEntryIndex].content = event.target.value; // Update the content of the selected entry

  // Save the entry content to local storage
  localStorage.setItem(`content_${entries[selectedEntryIndex].id}`, event.target.value);
});

// Handle the event when the entry title is clicked
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("entry-title") && event.target.tagName === "H3") {
    const selectedTitle = event.target;
    const previousTitle = selectedTitle.textContent;
    
    selectedTitle.contentEditable = true;
    selectedTitle.classList.add("editable");
    selectedTitle.focus();
    
    selectedTitle.addEventListener("keydown", (event) => {
      // Prevent Enter key from triggering line break in the editable title
      if (event.key === "Enter") {
        event.preventDefault();
        selectedTitle.blur();
      }
    });
    
    selectedTitle.addEventListener("blur", () => {
      selectedTitle.contentEditable = false;
      selectedTitle.classList.remove("editable");
      
      const newTitle = selectedTitle.textContent.trim();
      if (newTitle !== previousTitle) {
        entries[selectedEntryIndex].title = newTitle;
        // Save the entry title to local storage
        localStorage.setItem(`title_${entries[selectedEntryIndex].id}`, newTitle);
      }
    });
  }
});
