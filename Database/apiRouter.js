const express = require("express");
const apiRouter = express.Router();

// Define your API routes
apiRouter.get("/", (req, res) => {
  res.send("API Home");
});

apiRouter.post("/summary", (req, res) => {
  // Handle text summarization
  // Example code:
  const { text } = req.body;
  // Perform the text summarization using the provided text
  // Return the summary
  
  res.send("Summary generated successfully");
});

// Export the API router
module.exports = apiRouter;
