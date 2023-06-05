// Sample entries for demonstration
const entries = [
    { id: 1, title: 'Latest Entry', content: 'Lorem ipsum dolor sit amet.' },
    { id: 2, title: 'Another Entry', content: 'Sed ut perspiciatis unde omnis iste natus error.' },
    { id: 3, title: 'Last Entry', content: 'Eaque ipsa quae ab illo inventore veritatis et quasi.' }
  ];
  
  const entryList = document.getElementById("entry-list");
  let selectedEntryIndex = -1; // Index of the currently selected entry
  
  const renderEntryList = () => {
    entryList.innerHTML = ""; // Clear the previous entries
  
    entries.forEach((entry, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("entry-item");
  
      if (index === selectedEntryIndex) {
        listItem.classList.add("selected");
      }
  
      const title = document.createElement("h3");
      title.classList.add("entry-title");
      title.textContent = entry.title;
  
      const content = document.createElement("p");
      content.classList.add("entry-content");
      content.textContent = entry.content;
  
      listItem.appendChild(title);
      listItem.appendChild(content);
  
      listItem.addEventListener("click", () => {
        selectEntry(index);
      });
  
      entryList.appendChild(listItem);
    });
  };
  
  const selectEntry = (index) => {
    if (index === selectedEntryIndex) {
      return; // Already selected, no need to perform any action
    }
  
    const entryItems = document.querySelectorAll(".entry-item");
    if (selectedEntryIndex >= 0 && selectedEntryIndex < entryItems.length) {
      entryItems[selectedEntryIndex].classList.remove("selected");
    }
  
    selectedEntryIndex = index;
  
    if (selectedEntryIndex >= 0 && selectedEntryIndex < entryItems.length) {
      entryItems[selectedEntryIndex].classList.add("selected");
    }
  
    // Perform any additional actions when selecting an entry
    // For example, update the journal textarea with the selected entry's content
  };
  
  const navigateEntries = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault(); // Prevent the default scrolling behavior
      selectEntry(selectedEntryIndex - 1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault(); // Prevent the default scrolling behavior
      selectEntry(selectedEntryIndex + 1);
    }
  };
  
  document.addEventListener("keydown", navigateEntries);
  
  renderEntryList(); // Render the initial entry list
  