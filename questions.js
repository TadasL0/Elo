console.log('Running script');

var fixedList;
var editableList;

function toggleQuestionsSettingsPanel() {
  var settingsPanel = document.getElementById('questions-settings-panel');
  var settingsIcon = document.getElementById('questions-settings-icon');

  var settingsPanelComputedStyle = window.getComputedStyle(settingsPanel);
  
  if (settingsPanelComputedStyle.right === '0px') {
    settingsPanel.style.right = '-260px';
    settingsIcon.classList.remove('spin');
  } else {
    settingsPanel.style.right = '0px';
    settingsIcon.classList.add('spin');
}

  settingsPanel.classList.toggle('open');
}  

  console.log('settingsPanelComputedStyle.right after:', settingsPanelComputedStyle.right);

function storeOrder() {
  var fixedOrderArray = Array.from(fixedList.children).map(function (li) {
    return li.getAttribute('data-id');
  });

  var editableOrderArray = Array.from(editableList.children).map(function (li) {
    return li.getAttribute('data-id');
  });

  localStorage.setItem('fixedOrder', JSON.stringify(fixedOrderArray));
  localStorage.setItem('editableOrder', JSON.stringify(editableOrderArray));
}

function loadOrder() {
  var fixedOrder = JSON.parse(localStorage.getItem('fixedOrder')) || [];
  var editableOrder = JSON.parse(localStorage.getItem('editableOrder')) || [];

  fixedOrder.forEach(function(questionId) {
    var item = Array.from(fixedList.children).find(function(li) {
      return li.getAttribute('data-id') === questionId;
    });
    if (item !== undefined) {
      fixedList.appendChild(item);
    }
  });

  editableOrder.forEach(function(questionId) {
    var item = Array.from(editableList.children).find(function(li) {
      return li.getAttribute('data-id') === questionId;
    });
    if (item !== undefined) {
      editableList.appendChild(item);
    }
  });
};

document.addEventListener('DOMContentLoaded', function() {
  fixedList = document.getElementById('predefined-question-list');
  editableList = document.getElementById('user-question-list');

  Sortable.create(fixedList, { group: 'shared', animation: 150, store: { get: function (sortable) {}, set: function (sortable) { storeOrder(); } } });
  Sortable.create(editableList, { group: 'shared', animation: 150, store: { get: function (sortable) {}, set: function (sortable) { storeOrder(); } } });

  document.getElementById('questions-settings-icon').addEventListener('click', toggleQuestionsSettingsPanel);
  loadOrder();

  document.getElementById('journal-entry').addEventListener('input', function() {
    localStorage.setItem('journalEntry', this.value);
    console.log('Entry stored: ', this.value);
  });

});

function changeQuestion() {
  var randomIndex = Math.floor(Math.random() * (fixedList.children.length + editableList.children.length));
  var questions = document.querySelectorAll('.question-item');
  var chosenQuestion = questions[randomIndex].textContent;
  document.getElementById('question-display').textContent = chosenQuestion;
  console.log('Question changed: ', chosenQuestion);
}
