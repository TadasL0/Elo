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

// Function to store lists order to local storage
function storeOrder() {
  var fixedOrder = Array.from(fixedList.children).map(li => li.textContent);
  var editableOrder = Array.from(editableList.children).map(li => li.querySelector('span[contenteditable=true]').textContent);

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

// Make sure the DOM is fully loaded before initializing Sortable
document.addEventListener("DOMContentLoaded", function() {
  window.fixedList = document.getElementById('sortable-fixed-list');
  window.editableList = document.getElementById('sortable-editable-list');

  Sortable.create(fixedList, {
    group: 'shared', 
    animation: 150,
    draggable: '.sortable-item', // specifying draggable elements
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
    draggable: '.sortable-item', // specifying draggable elements
    onAdd: function (evt) {
      var item = editableList.children[evt.newIndex];
      item.setAttribute('contenteditable', 'true');
      storeOrder();
    },
  });

  // Load the order when the page loads
  loadOrder();
});
