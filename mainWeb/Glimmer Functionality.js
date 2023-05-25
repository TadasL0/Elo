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
