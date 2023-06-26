document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('search-form').addEventListener('submit', function(event) {
      event.preventDefault();
      var searchQuery = document.getElementById('goal').value;
      submitGoal(searchQuery);
  });
});

function submitGoal(goal) {
  if (goal) {
    const prompt = `Breakdown of goal "${goal}" into tasks:`;
    axios.post('http://159.65.123.253:3001/api/gpt4', { prompt: prompt })
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
