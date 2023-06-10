window.applyHighlightColor = function(colorClass) {
  console.log('Function called with color class:', colorClass);

  let selectedText = window.getSelection();
  let range = selectedText.getRangeAt(0);
  let parent = range.commonAncestorContainer;

  // Log the parent to the console
  console.log('Initial parent:', parent);

  // Check if selected text is within the contentEditable div
  while (parent != null && parent.id !== 'journal-entry') {
      parent = parent.parentNode;
  }

  // Log the final parent to the console
  console.log('Final parent:', parent);

  // If parent is null, then selected text was outside contentEditable div
  if (parent === null) {
      console.log('Selected text is not within the text area');
      alert('Please select the text within the text area');
      return;
  }

  // Ensure that some text is selected
  if (selectedText.toString().length === 0) {
      console.log('No text was selected');
      alert('Please select some text to highlight');
      return;
  }

  // create a new span element, apply the class to it, and wrap it around the selected text
  let span = document.createElement("span");
  span.classList.add(colorClass);
  try {
      range.surroundContents(span);
      console.log('Highlight applied successfully');
  } catch (e) {
      console.log('Error applying highlight:', e.message);
      alert('Error applying highlight: ' + e.message);
  }
}
