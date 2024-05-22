require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const {
  errorHandler,
  notFoundHandler,
} = require('./middlewares/errorHandlers');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Routes
app.use(routes);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
