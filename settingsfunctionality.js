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

document.addEventListener("DOMContentLoaded", function() {
  var fixedList = document.getElementById('sortable-fixed-list');
  var editableList = document.getElementById('sortable-editable-list');

  new Sortable(fixedList, {
    group: 'shared',
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    onAdd: function (evt) {
      if (fixedList.children.length > 5) {
        editableList.appendChild(fixedList.children[5]);
        editableList.lastChild.setAttribute('contenteditable', 'true');
      }
    }
  });

  new Sortable(editableList, {
    group: 'shared',
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65
  });
});

