"use strict";

let previousTextareaLength = 0;

function loadXPFromLocalStorage() {
  const xp = localStorage.getItem('xp');
  return xp ? parseInt(xp, 10) : 0;
}

function saveXPToLocalStorage(xp) {
  localStorage.setItem('xp', xp.toString());
}

function updateEntry() {
  const textarea = document.getElementById('journal-entry');
  const currentTextareaLength = textarea.value.length;

  if(currentTextareaLength > previousTextareaLength) {
    const difference = currentTextareaLength - previousTextareaLength; 
    increaseXP(difference); 
    console.log('XP should have been increased.'); 
  }

  previousTextareaLength = currentTextareaLength;
}

function increaseXP(points) {
  let xp = loadXPFromLocalStorage();
  xp += points;
  const widthPercentage = (xp % 1000) / 10; 

  console.log(`XP: ${xp}, Width Percentage: ${widthPercentage}`);

  let xpBarElement = document.getElementById('xp-bar');
  if(xpBarElement) {
    xpBarElement.style.width = `${widthPercentage}%`;
  }
  
  saveXPToLocalStorage(xp);
}


document.addEventListener('DOMContentLoaded', (event) => {
  const xp = loadXPFromLocalStorage();
  document.getElementById('xp-bar').style.width = `${(xp % 1000) / 10}%`;
  document.getElementById('xp-bar-container').innerText = `Level ${Math.floor(xp / 1000) + 1}: `;

  const textarea = document.getElementById('journal-entry');
  textarea.addEventListener('input', updateEntry);
});
