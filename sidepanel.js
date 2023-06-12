window.addEventListener("DOMContentLoaded", (event) => {
    const sidePanel = document.getElementById('side-panel');
    const toggleButton = document.querySelector('.toggle-button');
  
    // Set initial style for the side panel
    sidePanel.style.left = "0px";
  
    // Calculate the width of the side panel
    const sidePanelWidth = sidePanel.offsetWidth;
  
    // Calculate the visible portion as a percentage of the window width
    const visiblePortion = window.innerWidth * 0.09; // This is 10%. Adjust the value as needed.
  
    // Adjust the left property when the button is clicked
    toggleButton.addEventListener('click', () => {
      if (sidePanel.style.left === "0px") {
        sidePanel.style.left = `-${sidePanelWidth - visiblePortion}px`;  
      } else {
        sidePanel.style.left = "0px";
      }
    });
  });
  