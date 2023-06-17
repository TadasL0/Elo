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

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
