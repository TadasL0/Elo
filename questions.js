console.log('Running script');

let fixedList;
let editableList;

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
  });
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
  });

  Array.from(editableList.children).forEach((item) => {
    attachBlurListenerToQuestionItem(item);
  });
});

function changeQuestion() {
  const totalQuestions = fixedList.children.length + editableList.children.length;
  const randomIndex = Math.floor(Math.random() * totalQuestions);
  const questions = document.querySelectorAll('.question-item');

  if (randomIndex < questions.length) {
    const chosenQuestion = questions[randomIndex].textContent;
    document.getElementById('question-display').textContent = chosenQuestion;
    console.log('Question changed: ', chosenQuestion);
  } else {
    console.error(`Index out of bounds: ${randomIndex}`);
  }
}
