const express = require('express');
const { spawn } = require('child_process');

const app = express();

app.use(express.json());

app.post("/api/entries", (req, res) => {
  const { title, content } = req.body;

  // Save the journal entry to the PostgreSQL database
  pool.query(
    "INSERT INTO entries (title, content) VALUES ($1, $2)",
    [title, content],
    (err, result) => {
      if (err) {
        console.error("Error saving journal entry:", err);
        res.status(500).json({ error: "An error occurred while saving the journal entry" });
      } else {
        console.log("Journal entry saved successfully");
        res.status(200).json({ message: "Journal entry saved successfully" });
      }
    }
  );
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
