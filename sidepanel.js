window.addEventListener("DOMContentLoaded", (event) => {
  const sidePanel = document.getElementById('side-panel');
  const toggleButton = document.querySelector('.toggle-button');
  const panelEntries = document.querySelectorAll('#side-panel .entry-list');
  const settingsToggle = document.getElementById('custom-settings-icon');

  // Calculate the width of the side panel
  const sidePanelWidth = sidePanel.getBoundingClientRect().width;

  // Calculate the visible portion as a percentage of the window width
  let visiblePortion;
  if (window.matchMedia("(max-width: 600px)").matches) {
    // If the viewport is 600px or less, make the side panel poke out more
    visiblePortion = window.innerWidth * 0.15; // Adjust this value as needed
  } else {
    // If the viewport is more than 600px, use the original value
    visiblePortion = window.innerWidth * 0.06;
  }

  // Set initial style for the side panel as closed
  sidePanel.style.left = `-${sidePanelWidth - visiblePortion}px`;

  // Initially, make the entries invisible
  panelEntries.forEach(entry => {
    entry.style.opacity = "0";
  });

  // Adjust the left property when the button is clicked
  toggleButton.addEventListener('click', () => {
    if (sidePanel.style.left !== "0px") {
      sidePanel.style.left = "0px";
      settingsToggle.style.opacity = '0';
      settingsToggle.style.pointerEvents = 'none';

      // Make the entries visible after the panel has been opened
      setTimeout(() => {
        panelEntries.forEach(entry => {
          entry.style.opacity = "1";
        });
      }, 200); 

    } else {
      sidePanel.style.left = `-${sidePanelWidth - visiblePortion}px`;
      setTimeout(() => {
        settingsToggle.style.opacity = '1';
        settingsToggle.style.pointerEvents = 'auto';
      }, 200);

      // Delay the entries to disappear after the panel has closed
      setTimeout(() => {
        panelEntries.forEach(entry => {
          entry.style.opacity = "0";
        });
      }, 200);
    }
  });
});
