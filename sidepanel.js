window.addEventListener("DOMContentLoaded", (event) => {
  const sidePanel = document.getElementById('side-panel');
  const toggleButton = document.querySelector('.toggle-button');

  // Set initial style for the side panel
  sidePanel.style.left = "0px";

  // Calculate the width of the side panel
  const sidePanelWidth = sidePanel.offsetWidth;

  // Adjust the left property when the button is clicked
  toggleButton.addEventListener('click', () => {
      if (sidePanel.style.left === "0px") {
          sidePanel.style.left = `-${sidePanelWidth - 72}px`;  // Leaving 50px visible
      } else {
          sidePanel.style.left = "0px";
      }
  });
});
