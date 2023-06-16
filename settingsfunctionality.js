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

// Load list states from localStorage
function loadListStates() {
  var fixedList = document.getElementById('sortable-fixed-list');
  var editableList = document.getElementById('sortable-editable-list');
  
  var fixedListState = localStorage.getItem('fixedListState');
  var editableListState = localStorage.getItem('editableListState');
  
  if (fixedListState) {
    fixedList.innerHTML = fixedListState;
  }
  
  if (editableListState) {
    editableList.innerHTML = editableListState;
  }
}

// Save list states to localStorage
function saveListStates() {
  var fixedList = document.getElementById('sortable-fixed-list');
  var editableList = document.getElementById('sortable-editable-list');

  localStorage.setItem('fixedListState', fixedList.innerHTML);
  localStorage.setItem('editableListState', editableList.innerHTML);
}

document.addEventListener("DOMContentLoaded", function() {
  loadListStates();
  
  var fixedList = document.getElementById('sortable-fixed-list');
  var editableList = document.getElementById('sortable-editable-list');

  Sortable.create(fixedList, {
    group: 'shared', 
    animation: 150,
    draggable: '.sortable-item',
    onAdd: function (evt) {
      if (fixedList.children.length > 5) {
        editableList.appendChild(fixedList.children[5]);
      }
      saveListStates();
    },
    onUpdate: function(evt) {
      saveListStates();
    }
  });

  Sortable.create(editableList, {
    group: 'shared', 
    animation: 150,
    draggable: '.sortable-item',
    onAdd: function (evt) {
      var item = editableList.children[evt.newIndex];
      item.setAttribute('contenteditable', 'true');
      saveListStates();
    },
    onUpdate: function(evt) {
      saveListStates();
    }
  });
});
