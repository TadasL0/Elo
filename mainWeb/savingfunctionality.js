const saveEntry = async () => {
  const entry = document.getElementById("journal-entry").value;
  const data = {
    title: "Diary Entry",
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

document.getElementById("save-entry-button").addEventListener("click", saveEntry);
