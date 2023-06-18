function toggleCustomSettingsPanel() {
    var settingsPanel = document.getElementById('custom-settings-panel');
    var settingsIcon = document.getElementById('custom-settings-icon');
  
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
    var fixedOrder = Array.from(fixedList.children).map(li => li.textContent);
    var editableOrder = Array.from(editableList.children).map(li => li.querySelector('span[contenteditable=true]').textContent);
  
    localStorage.setItem('fixedOrder', JSON.stringify(fixedOrder));
    localStorage.setItem('editableOrder', JSON.stringify(editableOrder));
  }
  
  function loadOrder() {
    var fixedOrder = localStorage.getItem('fixedOrder') ? JSON.parse(localStorage.getItem('fixedOrder')) : [];
    var editableOrder = localStorage.getItem('editableOrder') ? JSON.parse(localStorage.getItem('editableOrder')) : [];
  
    while (fixedList.firstChild) {
      fixedList.firstChild.remove();
    }
  
    fixedOrder.forEach(function (question) {
      var li = document.createElement('li');
      li.textContent = question;
      li.className = 'sortable-item';
      fixedList.appendChild(li);
    });
  
    while (editableList.firstChild) {
      editableList.firstChild.remove();
    }
  
    editableOrder.forEach(function (question) {
      var li = document.createElement('li');
      li.className = 'sortable-item';
      li.innerHTML = `<span class="drag-handle"></span> <span contenteditable="true">${question}</span>`;
      editableList.appendChild(li);
    });
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    window.fixedList = document.getElementById('sortable-fixed-list');
    window.editableList = document.getElementById('sortable-editable-list');
  
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
  });
  
  window.onload = function() {
    loadOrder();
    changeQuestion();
    document.getElementById('journal-entry').focus();
  };
  
  document.getElementById('journal-entry').addEventListener('input', function() {
    if (!this.value) {
        changeQuestion();
    }
  });
  
  function changeQuestion() {
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
  }
  