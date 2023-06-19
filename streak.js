function updateStreak() {
    const streakCountElement = document.getElementById('streak-count');
  
    // Get today's date, but only up to the day, not including time
    let today = new Date().toISOString().slice(0, 10);
  
    let lastVisit = localStorage.getItem('lastVisit');
    let streakCount = localStorage.getItem('streakCount');
  
    if (lastVisit === null) {
      // If no record of last visit, this is the first visit
      streakCount = 1;
    } else if (lastVisit !== today) {
      // If last visit is not today, increment the streak
      streakCount = Number(streakCount) + 1;
    }
  
    // Update last visit and streak count in local storage
    localStorage.setItem('lastVisit', today);
    localStorage.setItem('streakCount', streakCount);
  
    // Update streak count on the page
    streakCountElement.textContent = streakCount;
  }
  
  window.onload = function() {
    // Update the streak as soon as the page loads
    updateStreak();
  };
  