const express = require('express');
const { spawn } = require('child_process');

const app = express();

app.use(express.json());

app.post('/summarize', (req, res) => {
  const text = req.body.text; // Assuming the text is sent in the request body

  // Spawn a Python process and execute the summarization script
  const pythonProcess = spawn('python', ['summarization.py', text]);

  let summary = '';

  pythonProcess.stdout.on('data', (data) => {
    // Capture the output from the Python process
    summary += data.toString();
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      // Return the summary as the response
      res.json({ summary });
    } else {
      // Handle any errors
      res.status(500).json({ error: 'An error occurred during summarization' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
