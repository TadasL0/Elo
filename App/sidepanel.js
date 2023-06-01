// JavaScript code to toggle the side panel
function toggleSidePanel() {
  const sidePanel = document.getElementById('side-panel');
  sidePanel.classList.toggle('show-panel');
}

const sidePanel = document.getElementById('side-panel');
const toggleButton = document.getElementById('toggle-button');

let isPanelOpen = false;

toggleButton.addEventListener('click', () => {
  isPanelOpen = !isPanelOpen;
  if (isPanelOpen) {
    sidePanel.style.transform = 'translateX(0)';
  } else {
    sidePanel.style.transform = 'translateX(-100%)';
  }
});
