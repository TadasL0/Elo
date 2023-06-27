const API_ENDPOINT_GPT4 = "https://api.openai.com/v2/engines/davinci-codex/completions";
const API_KEY = process.env.elo_key;

const extractMainIssue = async (text) => {
  try {
    const response = await fetch(API_ENDPOINT_GPT4, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `${text}\n\nExtract the single most pervasive severe issue and output it succinctly`,
        max_tokens: 100,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData.choices[0].text.trim();
  } catch (error) {
    console.error("An error occurred while extracting the main issue:", error);
  }
};

const updateMainQuest = async (storage = window.localStorage) => {
  try {
    const journalEntryElement = document.getElementById("journal-entry");

    const mainIssue = await extractMainIssue(journalEntryElement.value);

    // Save the main issue in local storage
    storage.setItem('mainQuest', mainIssue);

    // Update main quest in the textarea
    const mainQuestElement = document.getElementById('main-quest');
    if (mainQuestElement) {
      mainQuestElement.value = mainIssue;
    }
  } catch (error) {
    console.error("An error occurred while updating the main quest:", error);
  }
};

window.updateMainQuest = updateMainQuest;

window.onload = function() {
  // Update the streak as soon as the page loads
  updateStreak();

  // Load the main quest from local storage
  const mainQuest = window.localStorage.getItem('mainQuest');
  if (mainQuest) {
    document.getElementById('main-quest').value = mainQuest;
  }

  // Update main quest after page load
  updateMainQuest();
};
