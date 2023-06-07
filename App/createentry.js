// Retrieve entries from local storage or initialize an empty array
let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

// Get the necessary DOM elements
const entryList = document.getElementById("entry-list");
const toggleButton = document.querySelector(".toggle-button");
const sidePanel = document.getElementById("side-panel");
const newEntryButton = document.querySelector(".new-entry-button");

// Variable to keep track of the selected entry
let selectedEntryIndex = null;

// Function to render the entry list
function renderEntryList() {
  entryList.innerHTML = "";

  entries.forEach((entry, index) => {
    const entryItem = document.createElement("li");
    entryItem.className = "entry-item";
    entryItem.textContent = entry.title;
    entryItem.addEventListener("click", () => {
      selectEntry(index);
    });

    entryList.appendChild(entryItem);
  });
}

// Function to select an entry
function selectEntry(index) {
  selectedEntryIndex = index;

  entries.forEach((entry, i) => {
    const entryItem = entryList.children[i];
    if (i === index) {
      entryItem.classList.add("selected");
    } else {
      entryItem.classList.remove("selected");
    }
  });

  const selectedEntry = entries[selectedEntryIndex];
  document.getElementById("entry-title").textContent = selectedEntry.title;
  document.getElementById("journal-entry").value = selectedEntry.content;
}

// Function to create a new entry
function createNewEntry() {
  const newEntry = {
    title: "New Entry",
    content: "",
  };

  entries.push(newEntry);
  saveEntriesToLocalStorage();
  renderEntryList();
  selectEntry(entries.length - 1);
}

// Function to save entries to local storage
function saveEntriesToLocalStorage() {
  localStorage.setItem("journalEntries", JSON.stringify(entries));
}

// Initialize the app
renderEntryList();

// Check if there are entries in the list
if (entries.length > 0) {
  selectEntry(0); // Select the first entry by default
} else {
  createNewEntry(); // Create a new entry if the list is empty
}

// Handle the event when the entry title is clicked
document.getElementById("entry-title").addEventListener("click", () => {
  const selectedEntry = entries[selectedEntryIndex];
  const entryTitle = document.getElementById("entry-title");

  // Add editable class to make the title editable
  entryTitle.contentEditable = true;
  entryTitle.classList.add("editable");

  // Save the updated title when the user focuses out of the element
  entryTitle.addEventListener("focusout", () => {
    selectedEntry.title = entryTitle.textContent;
    entryTitle.contentEditable = false;
    entryTitle.classList.remove("editable");
    saveEntriesToLocalStorage();
  });
});

// Handle the event when the textarea input changes
document.getElementById("journal-entry").addEventListener("input", (event) => {
  entries[selectedEntryIndex].content = event.target.value; // Update the content of the selected entry
  saveEntriesToLocalStorage();
});

// Toggle the side panel when the toggle button is clicked
toggleButton.addEventListener("click", () => {
  sidePanel.classList.toggle("show-panel");

  // Toggle visibility of entry items when side panel is closed
  const entryItems = document.getElementsByClassName("entry-item");
  for (let item of entryItems) {
    item.classList.toggle("entry-visible");
  }
});

// Create new entry when the new entry button is clicked
newEntryButton.addEventListener("click", () => {
  createNewEntry();
});
