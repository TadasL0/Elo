const express = require("express");
const apiRouter = express.Router();

// Define your API routes
apiRouter.get("/", (req, res) => {
  console.log("Received a GET request to /api");
  res.send("API Home");
});

apiRouter.post("/entries", (req, res) => {
  console.log("Received a POST request to /api/entries");
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

// Export the API router
module.exports = apiRouter;
