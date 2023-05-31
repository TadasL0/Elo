const express = require("express");

const apiRouter = express.Router();

// Define your API routes
apiRouter.get("/", (req, res) => {
  res.send("API Home");
});

// Export the API router
module.exports = apiRouter;
