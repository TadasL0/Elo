// JavaScript code to toggle the side panel
const sidePanel = document.getElementById('side-panel');
const toggleButton = document.getElementById('toggle-button');

toggleButton.addEventListener('click', () => {
  sidePanel.classList.toggle('show-panel');
});

