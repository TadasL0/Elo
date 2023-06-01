const currentDate = new Date().toLocaleDateString();  // Get the current date

const saveEntry = async () => {
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
      console.log("Journal entry saved successfully");
    } else {
      console.error("Failed to save journal entry:", response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const condenseEntry = async () => {
  const entry = document.getElementById("journal-entry").value;
  const data = {
    text: entry,
  };

  try {
    const response = await fetch("http://localhost:3000/api/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const summary = await response.text();
      console.log("Summary:", summary);
    } else {
      console.error("Failed to retrieve summary:", response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

document.getElementById("save-entry-button").addEventListener("click", saveEntry);
document.getElementById("condense-button").addEventListener("click", condenseEntry);
