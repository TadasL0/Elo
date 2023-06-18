const express = require("express");
const apiRouter = express.Router();

module.exports = (pool) => {
  // GET route for /api
  apiRouter.get("/", (req, res) => {
    console.log("Received a GET request to /api");
    res.send("API Home");
  });

  // GET route for /api/entries
  apiRouter.get("/entries", (req, res) => {
    console.log("Received a GET request to /api/entries");

    // Retrieve the journal entries from the PostgreSQL database
    pool.query(
      "SELECT * FROM entries",
      [],
      (err, result) => {
        if (err) {
          console.error("Error retrieving journal entries:", err);
          res.status(500).json({ error: "An error occurred while retrieving the journal entries" });
        } else {
          console.log("Journal entries retrieved successfully");
          res.status(200).json({ message: "Journal entries retrieved successfully", data: result.rows });
        }
      }
    );
  });

  // POST route for /api/entries
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

  return apiRouter;
};
