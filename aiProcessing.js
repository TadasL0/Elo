const extractMainIssue = async (text) => {
    try {
      const response = await fetch("/api/mainIssue", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const { mainIssue } = await response.json();
  
      return mainIssue;
    } catch (error) {
      console.error("An error occurred while extracting the main issue:", error);
    }
  };  

  const updateMainQuest = async (storage = window.localStorage) => {
    try {
      const lastUpdated = storage.getItem('lastUpdated');
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  
      // Check if the main quest has already been updated today
      if (lastUpdated === today) return;
  
      const journalEntryElement = document.getElementById("journal-entry");
      const mainIssue = await extractMainIssue(journalEntryElement.value);
  
      // Save the main issue in local storage
      storage.setItem('mainQuest', mainIssue);
      storage.setItem('lastUpdated', today); // Update the date when the main quest was last updated
  
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
  