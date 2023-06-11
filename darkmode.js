document.addEventListener('DOMContentLoaded', (event) => {
  const toggleDarkMode = document.getElementById('toggle-dark-mode');
  const body = document.querySelector('body');

  // Set the initial state based on what's stored in localStorage
  const darkModeStoredState = localStorage.getItem('darkModeState') === 'true';
  toggleDarkMode.checked = darkModeStoredState;
  body.classList.toggle('dark-mode', darkModeStoredState);

  toggleDarkMode.addEventListener('change', (event) => {
      body.classList.toggle('dark-mode', event.target.checked);
      localStorage.setItem('darkModeState', event.target.checked);
  });
});
