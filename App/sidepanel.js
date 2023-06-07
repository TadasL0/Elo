// JavaScript code to toggle the side panel
function toggleSidePanel() {
  const sidePanel = document.getElementById('side-panel');
  const entryItems = document.getElementsByClassName('entry-item');

  sidePanel.classList.toggle('show-panel');

  // Toggle visibility of entry items when side panel is closed
  for (let item of entryItems) {
    item.classList.toggle('entry-visible');
  }
}

const toggleButton = document.querySelector('.toggle-button');
toggleButton.addEventListener('click', toggleSidePanel);
