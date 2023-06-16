// Import the Sortable library
var Sortable = require('sortablejs');

// Reference to the lists
var fixedList = document.getElementById('sortable-fixed-list');
var editableList = document.getElementById('sortable-editable-list');

// Function to store lists order to local storage
function storeOrder() {
    var fixedOrder = Array.from(fixedList.children).map(li => li.textContent);
    var editableOrder = Array.from(editableList.children).map(li => li.textContent);

    localStorage.setItem('fixedOrder', JSON.stringify(fixedOrder));
    localStorage.setItem('editableOrder', JSON.stringify(editableOrder));
}

// Function to load lists order from local storage
function loadOrder() {
    var fixedOrder = JSON.parse(localStorage.getItem('fixedOrder'));
    var editableOrder = JSON.parse(localStorage.getItem('editableOrder'));

    if (fixedOrder) {
        // Remove existing items
        while (fixedList.firstChild) {
            fixedList.firstChild.remove();
        }

        // Add items from the stored order
        fixedOrder.forEach(function (question) {
            var li = document.createElement('li');
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
        editableOrder.forEach(function (question) {
            var li = document.createElement('li');
            li.className = 'sortable-item';
            li.innerHTML = `<span class="drag-handle"></span> <span contenteditable="true">${question}</span>`;
            editableList.appendChild(li);
        });
    }
}

// Initialize Sortable on the lists
Sortable.create(fixedList, { animation: 150, onEnd: storeOrder });
Sortable.create(editableList, { animation: 150, handle: '.drag-handle', onEnd: storeOrder });

// Function to change the question
function changeQuestion() {
    var fixedOrder = JSON.parse(localStorage.getItem('fixedOrder')) || [];
    var editableOrder = JSON.parse(localStorage.getItem('editableOrder')) || [];
    var questions = fixedOrder.concat(editableOrder);
    var total = questions.length;
    var weights = questions.map((_, i) => total - i); // Higher index, higher chance
    var randomIndex = Math.floor(Math.random() * weights.reduce((a, b) => a + b, 0));

    for (var i = 0; i < weights.length; i++) {
        if (randomIndex < weights[i]) {
            document.getElementById('journal-entry').placeholder = questions[i];
            break;
        } else {
            randomIndex -= weights[i];
        }
    }
}

// Load the order and change the question when the page loads
window.onload = function() {
    loadOrder();
    changeQuestion();
};

// Change the question when the 'journal-entry' textarea gets focus
document.getElementById('journal-entry').addEventListener('focus', changeQuestion);
