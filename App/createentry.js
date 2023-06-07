const entryList = document.getElementById("entry-list");
let entries = [];
let selectedEntryIndex = 0; // Index of the currently selected entry

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

const createNewEntry = () => {
  const newEntryId = Date.now();
  const newEntry = { id: newEntryId, title: 'New Entry', content: '' };
  entries.push(newEntry);
  selectedEntryIndex = entries.length - 1;
  renderEntryList();
  selectEntry(selectedEntryIndex);
  scrollToSelectedEntry();
  saveEntriesToLocalStorage();
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
};

const saveEntriesToLocalStorage = () => {
  localStorage.setItem("entries", JSON.stringify(entries));
};

const scrollToSelectedEntry = () => {
  const selectedEntry = document.querySelector(".entry-item.selected");
  if (selectedEntry) {
    selectedEntry.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Retrieve entries from local storage if available
  const storedEntries = localStorage.getItem("entries");
  if (storedEntries) {
    entries = JSON.parse(storedEntries);
  } else {
    // If no entries found in local storage, use default entry
    entries = [
      { id: 1, title: 'Default Entry', content: '' }
    ];
  }

  renderEntryList(); // Render the initial entry list
  selectEntry(selectedEntryIndex);
});

// Handle the event when the textarea input changes
document.getElementById("journal-entry").addEventListener("input", (event) => {
  entries[selectedEntryIndex].content = event.target.value; // Update the content of the selected entry
  saveEntriesToLocalStorage();
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
        saveEntriesToLocalStorage();
      }
    });
  }
});
