import { library, dom } from '@fortawesome/fontawesome-free';
import { faFire } from '@fortawesome/free-solid-svg-icons';

library.add(faFire);
dom.watch();

function updateStreak() {
const streakCountElement = document.getElementById('streak-count');
let streakCount = parseInt(streakCountElement.textContent);

const lastEntryDate = localStorage.getItem('lastEntryDate');
const currentDate = new Date().toLocaleDateString();

// Check if the streak is continuing from the previous day
if (lastEntryDate !== currentDate) {
// Increment the streak count
streakCount++;
localStorage.setItem('lastEntryDate', currentDate);
}

streakCountElement.textContent = streakCount;
}

function completeJournalEntry() {
// Perform the journal entry tasks...

// Call the updateStreak function
updateStreak();
}

// Add an event listener to the "Save Entry" button
const saveEntryButton = document.getElementById('save-entry-button');
saveEntryButton.addEventListener('click', completeJournalEntry);