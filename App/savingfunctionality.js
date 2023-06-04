const currentDate = new Date().toLocaleDateString();  // Get the current date

const autosaveEntry = async () => {
  const entry = document.getElementById("journal-entry").value;
  const data = {
    title: `Diary Entry - ${currentDate}`,  // Add the current date to the title
    content: entry,
  };

  try {
    const response = await fetch("http://localhost:3000/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Journal entry autosaved successfully");
    } else {
      console.error("Failed to autosave journal entry:", response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

document.addEventListener("DOMContentLoaded", autosaveEntry);
