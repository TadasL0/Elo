let autosaveTimer; // Variable to store the timer ID

const autosaveEntry = async () => {
  // Clear any previous timer
  if (autosaveTimer) clearTimeout(autosaveTimer);

  // Set a new timer to trigger autosave after a brief delay
  autosaveTimer = setTimeout(async () => {
    const entry = document.getElementById("journal-entry").textContent;
    const currentDate = new Date().toLocaleDateString(); // Get the current date

    const data = {
      title: `Diary Entry - ${currentDate}`, // Add the current date to the title
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Journal entry autosaved successfully");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, 1000); // Adjust the delay as needed (e.g., 1000ms = 1 second)
};

// Ensure that the DOM is fully loaded before attaching the event listener
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("journal-entry").addEventListener("input", autosaveEntry);
});
