let autosaveTimer;
const ENTRY_MAX_LENGTH = 5000;
const AUTO_SAVE_DELAY = 5000; // in ms, 5s
const API_ENDPOINT = "https://app.eloskill.com/api/entries";
const LOCAL_STORAGE_KEY = "journalEntry";
const LOCAL_STORAGE_MAIN_QUEST_KEY = "mainQuest";

document.addEventListener('DOMContentLoaded', (event) => {
  setupPage();

  const form = document.getElementById('search-form');
  if(form){
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var searchQuery = document.getElementById('goal').value;
        submitGoal(searchQuery);
    });
  }
});

function submitGoal(goal) {
  if (goal) {
    const prompt = `Breakdown of goal "${goal}" into tasks:`;
    axios.post('http://159.65.123.253:3001/api/gpt4', { prompt: prompt })
      .then(response => {
        console.log(response.data);
        let chunks = response.data.choices[0].text.split('\n');
        let chunksList = document.getElementById('chunks-list');
        if(chunksList){
          chunksList.innerHTML = '';  // clear the list
          chunks.forEach(chunk => {
            let li = document.createElement('li');
            li.textContent = chunk;
            chunksList.appendChild(li);
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
}

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

const updateMainQuest = async (entry) => {
  try {
    const response = await fetch('/analyze-entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: entry }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { mainIssue } = await response.json();

    // Save the main quest in the local storage
    localStorage.setItem(LOCAL_STORAGE_MAIN_QUEST_KEY, mainIssue);

    const mainQuestTextArea = document.getElementById("main-quest-textarea");
    mainQuestTextArea.value = mainIssue;

    console.log("Main quest updated successfully:", mainIssue);
  } catch (error) {
    console.error("An error occurred while updating the main quest:", error);
  }
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
    console.error("An error occurred during autosave:", error);
  }
};

const loadFromLocalStore = (key) => {
  return localStorage.getItem(key);
};

const saveToLocalStore = (key, value) => {
  localStorage.setItem(key, value);
};

const setupPage = () => {
  try {
    const journalEntryElement = document.getElementById("journal-entry");

    const savedEntry = loadFromLocalStore(LOCAL_STORAGE_KEY);
    if (savedEntry) {
      journalEntryElement.value = savedEntry;
    }

    journalEntryElement.addEventListener("input", autosaveEntry);

    // Load the main quest from the local storage
    const mainQuest = localStorage.getItem(LOCAL_STORAGE_MAIN_QUEST_KEY);
    if (mainQuest) {
      const mainQuestTextArea = document.getElementById("main-quest-textarea");
      mainQuestTextArea.value = mainQuest;
    }
  } catch (error) {
    console.error("An error occurred while setting up the page:", error);
  }
};
