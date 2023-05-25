// Get the necessary elements
const diaryEntryContainer = document.getElementById('diary-entry-container');
const linkSpiral = document.querySelector('.link-spiral');

// Initialize variables
let isLinking = false;
let sourceBox = null;

// Add event listeners
linkSpiral.addEventListener('click', toggleLinking);
diaryEntryContainer.addEventListener('mousedown', handleMouseDown);
diaryEntryContainer.addEventListener('mouseup', handleMouseUp);

// Function to toggle linking mode
function toggleLinking() {
  isLinking = !isLinking;
  linkSpiral.classList.toggle('linking', isLinking);
}

// Function to handle mousedown event
function handleMouseDown(event) {
  const target = event.target;
  if (target.classList.contains('diary-entry') && isLinking) {
    sourceBox = target;
    sourceBox.classList.add('link-source');
    document.addEventListener('mousemove', handleMouseMove);
  }
}

// Function to handle mousemove event
function handleMouseMove(event) {
  if (sourceBox) {
    const links = document.querySelectorAll('.link');
    links.forEach(link => link.remove());

    const link = document.createElement('div');
    link.classList.add('link');
    link.style.left = `${sourceBox.offsetLeft + sourceBox.offsetWidth}px`;
    link.style.top = `${sourceBox.offsetTop + sourceBox.offsetHeight / 2}px`;
    link.style.height = `${event.clientY - sourceBox.offsetTop - sourceBox.offsetHeight / 2}px`;
    diaryEntryContainer.appendChild(link);
  }
}

// Function to handle mouseup event
function handleMouseUp(event) {
  const target = event.target;
  if (sourceBox && target.classList.contains('diary-entry')) {
    const link = document.querySelector('.link');
    link.style.height = `${target.offsetTop - sourceBox.offsetTop}px`;
    link.style.width = `${target.offsetLeft - sourceBox.offsetLeft - sourceBox.offsetWidth}px`;

    target.classList.add('link-target');
    createLinkString(sourceBox, target);
  }

  sourceBox = null;
  document.removeEventListener('mousemove', handleMouseMove);
}

// Function to create link string
function createLinkString(source, target) {
  const linkString = document.createElement('div');
  linkString.classList.add('link-string');
  linkString.innerHTML = '<i class="fas fa-link"></i>';
  linkString.style.left = `${source.offsetLeft + source.offsetWidth}px`;
  linkString.style.top = `${source.offsetTop + source.offsetHeight / 2}px`;
  linkString.style.width = `${target.offsetLeft - source.offsetLeft - source.offsetWidth}px`;
  linkString.style.height = `${target.offsetTop - source.offsetTop}px`;
  diaryEntryContainer.appendChild(linkString);
}
