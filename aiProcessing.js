const API_ENDPOINT_GPT4 = "https://api.openai.com/v2/engines/davinci-codex/completions";
const API_KEY = process.env.elo_key;

const extractMainIssue = async (text) => {
  try {
    const response = await fetch(API_ENDPOINT_GPT4, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": API_KEY,
      },
      body: JSON.stringify({
        prompt: `${text}\n\nWhat is the main issue here?`,
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

const updateMainQuest = async () => {
  try {
    const journalEntryElement = document.getElementById("journal-entry");
    const mainQuestElement = document.getElementById("main-quest");

    const mainIssue = await extractMainIssue(journalEntryElement.value);
    mainQuestElement.value = mainIssue;
  } catch (error) {
    console.error("An error occurred while updating the main quest:", error);
  }
};
