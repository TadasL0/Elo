let autosaveTimer;

const autosaveEntry = () => {
  if (autosaveTimer) clearTimeout(autosaveTimer);

  autosaveTimer = setTimeout(() => {
    const entry = document.getElementById("journal-entry").value;

    if (entry.trim() !== "" && entry.length <= 5000) {  // Check if entry is not empty and not too long
      const data = buildEntryData(entry);
      saveEntry(data);
    }

    try {
      saveToLocalStore("journalEntry", entry);
    } catch (error) {
      console.error("An error occurred while saving to Local Storage:", error);
    }
  }, 1000);
};

// Function to build the entry data
const buildEntryData = (entry) => {
  const currentDate = new Date(); // Get the current date
  const data = {
    title: `Diary Entry - ${currentDate.toLocaleDateString()}`,
    content: entry,
    date: currentDate.toISOString(), // convert date to string in ISO format
  };

  return data;
};


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
    throw new Error(`Failed to save to Local Storage: ${error}`);
  }
};

const loadFromLocalStore = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    throw new Error(`Failed to load from Local Storage: ${error}`);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const journalEntryElement = document.getElementById("journal-entry");
  journalEntryElement.addEventListener("input", autosaveEntry);
  
  try {
    const savedEntry = loadFromLocalStore("journalEntry");
    if (savedEntry) {
      journalEntryElement.value = savedEntry;
    }
  } catch (error) {
    console.error("An error occurred while loading from Local Storage:", error);
  }
});


