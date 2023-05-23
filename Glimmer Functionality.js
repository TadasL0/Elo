const newEntryButton = document.getElementById('new-entry-button');
const content = document.querySelector('.content');
let nextTextareaIndex = 1; // Counter for generating unique IDs

newEntryButton.addEventListener('click', createNewEntry);

// Create a new diary entry textbox
function createNewEntry() {
  const diaryEntryContainer = document.createElement('div');
  diaryEntryContainer.classList.add('diary-entry');

  const newDiaryEntryTextarea = createTextarea();
  diaryEntryContainer.appendChild(newDiaryEntryTextarea);
  content.appendChild(diaryEntryContainer);

  enableDraggable(diaryEntryContainer);

  newDiaryEntryTextarea.focus();
}

// Create a new textarea
function createTextarea() {
  const newDiaryEntryTextarea = document.createElement('textarea');
  newDiaryEntryTextarea.classList.add('diary-entry-textarea');
  newDiaryEntryTextarea.id = `diary-entry-${nextTextareaIndex}`;
  nextTextareaIndex++;

  const textareaColor = localStorage.getItem(`${newDiaryEntryTextarea.id}-color`);
  if (textareaColor) {
    newDiaryEntryTextarea.style.backgroundColor = textareaColor;
  }

  newDiaryEntryTextarea.addEventListener('input', () => {
    localStorage.setItem(newDiaryEntryTextarea.id, newDiaryEntryTextarea.value);
  });

  const textareaContent = localStorage.getItem(newDiaryEntryTextarea.id);
  if (textareaContent) {
    newDiaryEntryTextarea.value = textareaContent;
  }

  return newDiaryEntryTextarea;
}

// Set up draggable behavior
function enableDraggable(container) {
  let isDragging = false;
  let initialX = 0;
  let initialY = 0;

  container.addEventListener('mousedown', (event) => {
    isDragging = true;
    initialX = event.clientX - container.offsetLeft;
    initialY = event.clientY - container.offsetTop;
  });

  document.addEventListener('mousemove', (event) => {
    if (isDragging) {
      const newLeft = event.clientX - initialX;
      const newTop = event.clientY - initialY;
      container.style.left = `${Math.max(0, newLeft)}px`;
      container.style.top = `${Math.max(0, newTop)}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}
