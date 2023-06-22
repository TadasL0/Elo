let autosaveTimer;
const ENTRY_MAX_LENGTH = 5000;
const AUTO_SAVE_DELAY = 1000; // in ms
const API_ENDPOINT = "https://app.eloskill.com/api/entries";
const LOCAL_STORAGE_KEY = "journalEntry";

const autosaveEntry = () => {
  if (autosaveTimer) clearTimeout(autosaveTimer);

  autosaveTimer = setTimeout(() => {
    try {
      const entry = document.getElementById("journal-entry").value;

      if (entry.trim() !== "" && entry.length <= ENTRY_MAX_LENGTH) {
        const data = buildEntryData(entry);
        saveEntry(data);
      }

      saveToLocalStore(LOCAL_STORAGE_KEY, entry);
    } catch (error) {
      console.error("An error occurred during autosave:", error);
    }
  }, AUTO_SAVE_DELAY);
};

const buildEntryData = (entry) => {
  const currentDate = new Date();
  
  return {
    title: `Diary Entry - ${currentDate.toLocaleDateString()}`,
    content: entry,
    date: currentDate.toISOString(),
  };
};

const saveEntry = async (data) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Journal entry autosaved successfully:", responseData);
  } catch (error) {
    console.error("An error occurred while saving the entry:", error);
  }
};

const saveToLocalStore = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Failed to save to Local Storage: ${error}`);
  }
};

const loadFromLocalStore = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Failed to load from Local Storage: ${error}`);
  }
};

const setupPage = () => {
  try {
    const journalEntryElement = document.getElementById("journal-entry");
    
    const savedEntry = loadFromLocalStore(LOCAL_STORAGE_KEY);
    if (savedEntry) {
      journalEntryElement.value = savedEntry;
    }
  } catch (error) {
    console.error("An error occurred while setting up the page:", error);
  }
};

// We use window.onload here instead of DOMContentLoaded to make sure that all external resources are loaded.
window.onload = setupPage;
