window.applyHighlightColor = function(colorClass) {
  // get selected text
  let selectedText = window.getSelection();

  // create a new span element, apply the class to it, and wrap it around the selected text
  let span = document.createElement("span");
  span.classList.add(colorClass);
  let range = selectedText.getRangeAt(0);
  range.surroundContents(span);
}
