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

// Make sure the DOM is fully loaded before initializing Sortable
document.addEventListener("DOMContentLoaded", function() {
  var fixedList = document.getElementById('sortable-fixed-list');
  var editableList = document.getElementById('sortable-editable-list');

  Sortable.create(fixedList, {
    group: 'shared', 
    animation: 150,
    draggable: '.sortable-item', // specifying draggable elements
    onAdd: function (evt) {
      if (fixedList.children.length > 5) {
        editableList.appendChild(fixedList.children[5]);
      }
    },
  });

  Sortable.create(editableList, {
    group: 'shared', 
    animation: 150,
    draggable: '.sortable-item', // specifying draggable elements
    onAdd: function (evt) {
      var item = editableList.children[evt.newIndex];
      item.setAttribute('contenteditable', 'true');
    },
  });
});
