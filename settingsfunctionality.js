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
  new Sortable(document.getElementById('sortable-question-list'), {
      animation: 150,
  });
});

new Sortable(document.getElementById('sortable-question-list'), {
  animation: 150,
  store: {
    /**
     * Get the order of elements. Called once during initialization.
     * @param   {Sortable}  sortable
     * @returns {Array}
     */
    get: function (sortable) {
      var order = localStorage.getItem(sortable.options.group.name);
      return order ? order.split('|') : [];
    },

    /**
     * Save the order of elements. Called onEnd (when the item is dropped).
     * @param {Sortable}  sortable
     */
    set: function (sortable) {
      var order = sortable.toArray();
      localStorage.setItem(sortable.options.group.name, order.join('|'));
    }
  }
});
