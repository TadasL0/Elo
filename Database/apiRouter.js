const express = require("express");
const apiRouter = express.Router();

module.exports = (pool) => {
  // GET route for /api
  apiRouter.get("/", (req, res) => {
    console.log("Received a GET request to /api");
    res.send("API Home");
  });

  // GET route for /api/entries
  apiRouter.get("/entries", async (req, res) => {
    console.log("Received a GET request to /api/entries");

    try {
      // Retrieve the journal entries from the PostgreSQL database
      const result = await pool.query("SELECT * FROM entries ORDER BY date DESC");
      console.log("Journal entries retrieved successfully");
      res.status(200).json({ message: "Journal entries retrieved successfully", data: result.rows });
    } catch (err) {
      console.error("Error retrieving journal entries:", err);
      res.status(500).json({ error: "An error occurred while retrieving the journal entries" });
    }
  });

  // POST route for /api/entries
  apiRouter.post("/entries", express.json(), async (req, res) => {
    console.log("Received a POST request to /api/entries");

    try {
      const { title, content, date } = req.body;

      // Validate the input
      if (!title || !content || !date) {
        res.status(400).json({ error: "Missing title, content, or date" });
        return;
      }

      // Save the journal entry to the PostgreSQL database
      await pool.query(
        "INSERT INTO entries (title, content, date) VALUES ($1, $2, $3)",
        [title, content, new Date(date)] // Parse date string to Date object
      );
      
      console.log("Journal entry saved successfully");
      res.status(200).json({ message: "Journal entry saved successfully" });
    } catch (err) {
      console.error("Error saving journal entry:", err);
      res.status(500).json({ error: "An error occurred while saving the journal entry" });
    }
  });

  return apiRouter;
};
