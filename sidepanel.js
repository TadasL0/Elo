window.addEventListener("DOMContentLoaded", (event) => {
  const sidePanel = document.getElementById('side-panel');
  const toggleButton = document.querySelector('.toggle-button');
  const panelEntries = document.querySelectorAll('#side-panel .entry-list');

  // Calculate the width of the side panel
  const sidePanelWidth = sidePanel.offsetWidth;

  // Calculate the visible portion as a percentage of the window width
  const visiblePortion = window.innerWidth * 0.06; // This is 10%. Adjust the value as needed.

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

      // Make the entries visible after the panel has been opened
      setTimeout(() => {
          panelEntries.forEach(entry => {
              entry.style.opacity = "1";
          });
      }, 200); // Delay in milliseconds, adjust as needed

    } else {
      sidePanel.style.left = `-${sidePanelWidth - visiblePortion}px`;
      
      // Delay the entries to disappear after the panel has closed
      setTimeout(() => {
          panelEntries.forEach(entry => {
              entry.style.opacity = "0";
          });
      }, 200);  // Delay in milliseconds, adjust as needed
    }
  });
});

