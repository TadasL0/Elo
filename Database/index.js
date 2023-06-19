// server.js (or your server-side file)
const express = require("express");
const path = require('path');
const { Pool } = require("pg");
const cors = require("cors");
const createApiRouter = require("./apiRouter");
const rateLimit = require("express-rate-limit");
const winston = require('winston');
require('dotenv').config();

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
  origin: 'https://eloskill.com', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
  exposedHeaders: ['Access-Control-Allow-Origin'], 
  optionsSuccessStatus: 200
}));

app.use(limiter); // apply rate limiter

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// ** Serve static files from the React app **
app.use(express.static(path.join(__dirname, 'Skill')));

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
const apiRouter = createApiRouter(pool); 
app.use("/api", cors(), apiRouter); 

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const port = process.env.PORT || 3001;
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
