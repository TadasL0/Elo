const express = require('express');
const app = express();
const whisper = require('whisper'); // Assuming you have installed the OpenAI Whisper library

app.use(express.json());

app.post('/process-audio', (req, res) => {
  const audioData = req.body.audio; // Assuming the audio file is sent as a FormData object

  // Process the audio using OpenAI Whisper
  const model = whisper.load_model("base");
  const result = model.transcribe(audioData);

  // Return the transcription result
  res.json({ transcription: result.text });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
