window.addEventListener('DOMContentLoaded', (event) => {
    const leftPane = document.getElementById('left-pane');
    const rightPane = document.getElementById('right-pane');
    const loadingScreen = document.getElementById('loading-screen');
  
    setTimeout(() => {
      leftPane.style.transform = 'translateX(-100%)';
      rightPane.style.transform = 'translateX(100%)';
  
      setTimeout(() => {
        loadingScreen.parentNode.removeChild(loadingScreen);
      }, 1000);
    }, 1000);
  });
  