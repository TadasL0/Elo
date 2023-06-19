window.addEventListener('DOMContentLoaded', (event) => {
  const sidePanel = document.getElementById('side-panel');
  const sidePanelRect = sidePanel.getBoundingClientRect();

  setTimeout(() => {
    gsap.to("#loading-screen", {
      duration: 2,
      x: -window.innerWidth,
      ease: "power2.out",
    }).then(() => {
      const loadingScreen = document.querySelector("#loading-screen");
      loadingScreen.parentNode.removeChild(loadingScreen);
    });
  }, 400);
});
