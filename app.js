const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the CORS package
require('dotenv').config();

const app = express();
const port = 3000;

const booksRouter = require('./controllers/booksController');

// Configure body-parser for JSON
app.use(express.json());

// Enable CORS for all requests
app.use(cors());

// Set up books controller router
app.use('/books', booksRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Root index route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
