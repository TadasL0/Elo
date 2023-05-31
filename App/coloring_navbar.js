// Highlight functionality
function applyHighlightColor(colorClass) {
  const journalEntry = document.getElementById('journal-entry');
  const selectedText = window.getSelection().toString();

  if (selectedText !== '') {
    const span = document.createElement('span');
    span.classList.add(colorClass);
    span.textContent = selectedText;

    const range = window.getSelection().getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);
  }
}

// JavaScript code to toggle the side panel
const sidePanel = document.getElementById('side-panel');
const toggleButton = document.querySelector('.toggle-button');

toggleButton.addEventListener('click', () => {
  sidePanel.classList.toggle('show-panel');
});
