// Middleware to handle 404 Not Found
const notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: "Not Found" });
};

// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = { notFoundHandler, errorHandler };
