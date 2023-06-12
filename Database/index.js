// server.js (or your server-side file)
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const apiRouter = require("./apiRouter");
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  },
});


// Connect to PostgreSQL
async function connectToDatabase() {
  try {
    await pool.connect();
    console.log("Connected to PostgreSQL");
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
  }
}

connectToDatabase();

// Register the API routes
app.use("/api", apiRouter);

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

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
