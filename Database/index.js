// server.js (or your server-side file)
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const createApiRouter = require("./apiRouter");
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'https://eloskill.com', // or the specific origin you want to give access to
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // This allows the session cookie to be sent back and forth
  exposedHeaders: ['Access-Control-Allow-Origin'], // Add this line
  optionsSuccessStatus: 200
}));


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
    setTimeout(connectToDatabase, 5000); // Try again after 5 seconds
  }
}

connectToDatabase();

// Register the API routes
const apiRouter = createApiRouter(pool); // Pass the pool to create the router
app.use("/api", cors(), apiRouter); // Apply CORS specifically on your API routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Catch unhandled Promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
