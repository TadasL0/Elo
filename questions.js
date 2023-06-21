console.log('Running script');

function toggleQuestionsSettingsPanel() {
  console.log('toggleQuestionsSettingsPanel called');
  var settingsPanel = document.getElementById('questions-settings-panel');
  var settingsIcon = document.getElementById('questions-settings-icon');

  if (settingsPanel.style.right === '0px') {
    settingsPanel.style.right = '-260px';
    settingsIcon.classList.remove('spin');
  } else {
    settingsPanel.style.right = '0px';
    settingsIcon.classList.add('spin');
  }
  settingsPanel.classList.toggle('open');
}

function storeOrder() {
  console.log('storeOrder called');
  var fixedOrder = Array.from(fixedList.children).map(li => li.textContent);
  var editableOrder = Array.from(editableList.children).map(li => li.querySelector('span[contenteditable=true]').textContent);

  localStorage.setItem('fixedOrder', JSON.stringify(fixedOrder));
  localStorage.setItem('editableOrder', JSON.stringify(editableOrder));
}

const loadOrder = () => {
  console.log('loadOrder called');
  var fixedOrder = Array.from(fixedList.children).map(li => li.querySelector('.question-item').textContent);
  var editableOrder = Array.from(editableList.children).map(li => li.querySelector('.question-item').textContent);

  console.log('fixedOrder:', fixedOrder);
  console.log('editableOrder:', editableOrder);
  
  if (fixedOrder) {
    JSON.parse(fixedOrder).forEach(id => {
      const item = document.getElementById(id);
      if(item) {
        fixedList.appendChild(item);
        console.log('Added item to fixedList:', item);
      }
    });
  }

  if (editableOrder) {
    JSON.parse(editableOrder).forEach(id => {
      const item = document.getElementById(id);
      if(item) {
        editableList.appendChild(item);
        console.log('Added item to editableList:', item);
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", function() {
  console.log('DOMContentLoaded event');
  try {
    window.fixedList = document.getElementById('fixed-question-list');
    window.editableList = document.getElementById('editable-question-list');

    Sortable.create(fixedList, {
      group: 'shared', 
      animation: 150,
      draggable: '.sortable-item',
      onAdd: function (evt) {
        if (fixedList.children.length > 5) {
          editableList.appendChild(fixedList.children[5]);
        }
        storeOrder();
      },
    });

    Sortable.create(editableList, {
      group: 'shared', 
      animation: 150,
      draggable: '.sortable-item',
      onAdd: function (evt) {
        var item = editableList.children[evt.newIndex];
        item.setAttribute('contenteditable', 'true');
        storeOrder();
      },
    });

    loadOrder();

    document.getElementById('questions-settings-icon').addEventListener('click', toggleQuestionsSettingsPanel);

  } catch (error) {
    console.error('Error in DOMContentLoaded event handler:', error);
  }
});

window.onload = function() {
  console.log('window.onload event');
  try {
    document.getElementById('journal-entry').focus();
    changeQuestion();
  } catch (error) {
    console.error('Error in window.onload event handler:', error);
  }
};

document.getElementById('journal-entry').addEventListener('input', function() {
  console.log('journal-entry input event');
  if (!this.value) {
    changeQuestion();
  }
});

function changeQuestion() {
  console.log('changeQuestion called');
  try {
    const fixedOrder = JSON.parse(localStorage.getItem('fixedOrder')) || [];
    const editableOrder = JSON.parse(localStorage.getItem('editableOrder')) || [];
    const questions = fixedOrder.concat(editableOrder);
    const total = questions.length;
    const weights = questions.map((_, i) => total - i);
    let randomIndex = Math.floor(Math.random() * weights.reduce((a, b) => a + b, 0));

    for (let i = 0; i < weights.length; i++) {
        if (randomIndex < weights[i]) {
            document.getElementById('journal-entry').placeholder = questions[i];
            break;
        } else {
            randomIndex -= weights[i];
        }
    }
  } catch (error) {
    console.error('Error in changeQuestion:', error);
  }
}
