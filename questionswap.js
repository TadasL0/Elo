var questions = Array.from(document.getElementById('sortable-question-list').children).map(li => li.textContent);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function changeQuestion() {
    shuffleArray(questions);
    document.getElementById('journal-entry').placeholder = questions[0];
}

// Call the function when the page loads
window.onload = changeQuestion;
