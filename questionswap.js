// Import the Sortable library
import Sortable from 'sortablejs';

// Reference to the lists
const fixedList = document.getElementById('sortable-fixed-list');
const editableList = document.getElementById('sortable-editable-list');

// Function to store lists order to local storage
function storeOrder() {
    const fixedOrder = Array.from(fixedList.children).map(li => li.textContent);
    const editableOrder = Array.from(editableList.children).map(li => li.textContent);

    localStorage.setItem('fixedOrder', JSON.stringify(fixedOrder));
    localStorage.setItem('editableOrder', JSON.stringify(editableOrder));
}

// Function to load lists order from local storage
function loadOrder() {
    const fixedOrder = JSON.parse(localStorage.getItem('fixedOrder'));
    const editableOrder = JSON.parse(localStorage.getItem('editableOrder'));

    if (fixedOrder) {
        // Remove existing items
        while (fixedList.firstChild) {
            fixedList.firstChild.remove();
        }

        // Add items from the stored order
        fixedOrder.forEach(question => {
            const li = document.createElement('li');
            li.textContent = question;
            li.className = 'sortable-item';
            fixedList.appendChild(li);
        });
    }

    if (editableOrder) {
        // Remove existing items
        while (editableList.firstChild) {
            editableList.firstChild.remove();
        }

        // Add items from the stored order
        editableOrder.forEach(question => {
            const li = document.createElement('li');
            li.className = 'sortable-item';
            li.innerHTML = `<span class="drag-handle"></span> <span contenteditable="true">${question}</span>`;
            editableList.appendChild(li);
        });
    }
}

// Initialize Sortable on the lists
new Sortable(fixedList, { animation: 150, onEnd: storeOrder });
new Sortable(editableList, { animation: 150, handle: '.drag-handle', onEnd: storeOrder });

// Function to change the question
function changeQuestion() {
    const fixedOrder = JSON.parse(localStorage.getItem('fixedOrder')) || [];
    const editableOrder = JSON.parse(localStorage.getItem('editableOrder')) || [];
    const questions = fixedOrder.concat(editableOrder);
    const total = questions.length;
    const weights = questions.map((_, i) => total - i); // Higher index, higher chance
    let randomIndex = Math.floor(Math.random() * weights.reduce((a, b) => a + b, 0));

    for (let i = 0; i < weights.length; i++) {
        if (randomIndex < weights[i]) {
            document.getElementById('journal-entry').placeholder = questions[i];
            break;
        } else {
            randomIndex -= weights[i];
        }
    }
}

// Load the order and change the question when the page loads
loadOrder();
changeQuestion();

// Change the question when the 'journal-entry' textarea gets focus
document.getElementById('journal-entry').addEventListener('input', function() {
    if (!this.value) {
        changeQuestion();
    }
});
