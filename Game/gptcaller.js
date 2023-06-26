document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('search-form').addEventListener('submit', function(event) {
      event.preventDefault();
      var searchQuery = document.getElementById('goal').value;
      submitGoal(`Breakdown of goal "${searchQuery}" into tasks:`);
  });
});

function submitGoal(goal) {
  if (goal) {
    axios.post('http://localhost:3001/api/gpt4', { prompt: goal })
      .then(response => {
        console.log(response.data);
        let chunks = response.data.choices[0].text.split('\n');
        let chunksList = document.getElementById('chunks-list');
        chunksList.innerHTML = '';  // clear the list
        chunks.forEach(chunk => {
          let li = document.createElement('li');
          li.textContent = chunk;
          chunksList.appendChild(li);
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
}
