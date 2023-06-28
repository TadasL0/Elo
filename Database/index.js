// server.js (or your server-side file)
const express = require("express");
const path = require('path');
const { Pool } = require("pg");
const cors = require("cors");
const axios = require('axios');
const rateLimit = require("express-rate-limit");
const winston = require('winston');
require('dotenv').config({ path: '../database.env' });

const app = express();

// create a logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5500', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
  exposedHeaders: ['Access-Control-Allow-Origin'], 
  optionsSuccessStatus: 200
}));

app.use(express.json()); // This helps to parse JSON data in request body

app.use(limiter); // apply rate limiter

// ** Serve static files from the React app **
app.use(express.static(path.join(__dirname, '..')));

// DB config
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
    logger.info("Connected to PostgreSQL");
  } catch (error) {
    logger.error("Error connecting to PostgreSQL:", error);
    setTimeout(connectToDatabase, 5000); 
  }
}

connectToDatabase();

// Register the API routes
app.use("/api", cors(), express.Router()); 

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

// Catch all other routes and return the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Elo', 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// For getting the main issue highlighted

app.post("/api/mainIssue", async (req, res) => {
  try {
      const text = req.body.text;
      const axiosResponse = await axios.post(
          "https://api.openai.com/v4/engines/davinci-codex/completions",
          {
              prompt: `${text}\n\nWhat is the main issue here?`,
              max_tokens: 100,
              temperature: 0.5,
          },
          {
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + process.env.elo_key,
              },
          }
      );

      const gpt4Response = axiosResponse.data.choices[0].text.trim();

      res.json({mainIssue: gpt4Response});
  } catch (err) {
      console.error(err);
      res.status(500).json({
          message: "Error occurred when interacting with GPT-4 API",
      });
  }
});

// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

// Catch unhandled Promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// handle signals - in Docker container SIGINT will not be emitted on process exit
['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(signal =>
  process.on(signal, () =>
    server.close(err => {
      if (err) {
        logger.error(err);
        process.exit(1);
      }

      pool.end(() => {
        logger.info('DB connection closed.');
        process.exit(0);
      });
    })
  )
);
