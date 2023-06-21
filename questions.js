console.log('Running script');

let fixedList;
let editableList;

let questions = []; // Array to store all questions

function toggleQuestionsSettingsPanel() {
  const settingsPanel = document.getElementById('questions-settings-panel');
  const settingsIcon = document.getElementById('questions-settings-icon');

  const settingsPanelComputedStyle = window.getComputedStyle(settingsPanel);
  
  if (settingsPanelComputedStyle.right === '0px') {
    settingsPanel.style.right = '-260px';
    settingsIcon.classList.remove('spin');
  } else {
    settingsPanel.style.right = '0px';
    settingsIcon.classList.add('spin');
  }

  settingsPanel.classList.toggle('open');
}

function storeOrder() {
  const fixedOrderArray = Array.from(fixedList.children).map(li => li.getAttribute('data-id'));
  const editableOrderArray = Array.from(editableList.children).map(li => li.getAttribute('data-id'));

  localStorage.setItem('fixedOrder', JSON.stringify(fixedOrderArray));
  localStorage.setItem('editableOrder', JSON.stringify(editableOrderArray));
}

function loadOrder() {
  const fixedOrder = JSON.parse(localStorage.getItem('fixedOrder')) || [];
  const editableOrder = JSON.parse(localStorage.getItem('editableOrder')) || [];

  fixedOrder.forEach(questionId => {
    const item = Array.from(fixedList.children).find(li => li.getAttribute('data-id') === questionId);
    if (item) {
      fixedList.appendChild(item);
    }
  });

  editableOrder.forEach(questionId => {
    const item = Array.from(editableList.children).find(li => li.getAttribute('data-id') === questionId);
    if (item) {
      editableList.appendChild(item);
    }
  });

  // Update questions array after loading order
  updateQuestions();
}

function attachBlurListenerToQuestionItem(item) {
  const questionItem = item.querySelector('.question-item');
  questionItem.addEventListener('blur', () => {
    const updatedQuestion = questionItem.textContent;
    const questionId = item.getAttribute('data-id');
    let storedQuestions = JSON.parse(localStorage.getItem('editableQuestions')) || {};
    storedQuestions[questionId] = updatedQuestion;
    localStorage.setItem('editableQuestions', JSON.stringify(storedQuestions));
    console.log('Question renamed: ', updatedQuestion);

    // Update questions array after question renaming
    updateQuestions();
  });
}

// Function to update questions array
function updateQuestions() {
  const questionItems = document.querySelectorAll('.question-item');
  questions = Array.from(questionItems).map(item => item.textContent);
}

// Function to change placeholder text
function changePlaceholder() {
  const totalQuestions = questions.length;
  const randomIndex = Math.floor(Math.random() * totalQuestions);
  const journalEntryTextarea = document.getElementById('journal-entry');

  if (randomIndex < totalQuestions) {
    const chosenQuestion = questions[randomIndex];
    journalEntryTextarea.placeholder = chosenQuestion;
    console.log('Placeholder changed: ', chosenQuestion);
  } else {
    console.error(`Index out of bounds: ${randomIndex}`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fixedList = document.getElementById('predefined-question-list');
  editableList = document.getElementById('user-question-list');

  Sortable.create(fixedList, { group: 'shared', animation: 150, store: { get: (sortable) => {}, set: (sortable) => { storeOrder(); } } });
  Sortable.create(editableList, { group: 'shared', animation: 150, store: { get: (sortable) => {}, set: (sortable) => { storeOrder(); } } });

  document.getElementById('questions-settings-icon').addEventListener('click', toggleQuestionsSettingsPanel);
  
  loadOrder();

  document.getElementById('journal-entry').addEventListener('input', function() {
    localStorage.setItem('journalEntry', this.value);
    console.log('Entry stored: ', this.value);
  
    if (this.value === '') {
      changePlaceholder();
    }
  });

  Array.from(editableList.children).forEach((item) => {
    attachBlurListenerToQuestionItem(item);
  });

  // Update questions array and change placeholder immediately when the page loads
  updateQuestions();
  changePlaceholder();
});
