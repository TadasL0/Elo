let autosaveTimer; // Variable to store the timer ID

// Function to autosave an entry
const autosaveEntry = () => {
  if (autosaveTimer) clearTimeout(autosaveTimer);

  autosaveTimer = setTimeout(() => {
    const entry = document.getElementById("journal-entry").value;

    if (entry.trim() !== "") {  // Check if entry is not empty
      const data = buildEntryData(entry);
      saveEntry(data);
    }

    saveToLocalStore("journalEntry", entry);
  }, 1000);
};

// Function to build the entry data
const buildEntryData = (entry) => {
  const currentDate = new Date().toLocaleDateString(); // Get the current date
  const data = {
    title: `Diary Entry - ${currentDate}`,
    content: entry,
  };

  return data;
};

// Function to save an entry
const saveEntry = async (data) => {
  try {
    const response = await fetch("https://app.eloskill.com/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("Journal entry autosaved successfully");
  } catch (error) {
    console.error("An error occurred while saving the entry:", error);
  }
};

// Function to save to local storage
const saveToLocalStore = (key, value) => {
  localStorage.setItem(key, value);
};

// Function to load from local storage
const loadFromLocalStore = (key) => {
  return localStorage.getItem(key);
};

// Ensure that the DOM is fully loaded before attaching the event listener
document.addEventListener('DOMContentLoaded', () => {
  const journalEntryElement = document.getElementById("journal-entry");
  journalEntryElement.addEventListener("input", autosaveEntry);
  
  const savedEntry = loadFromLocalStore("journalEntry");
  if (savedEntry) {
    journalEntryElement.value = savedEntry;
  }
});
