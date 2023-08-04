const express = require('express');
const Book = require('../models/bookModel');
const booksRouter = express.Router();

// GET /books
booksRouter.get('/', (req, res) => {
    Book.find()
      .then((books) => {
        res.status(200).json(books);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Error fetching books', message: err.message });
      });
  });
  
  // GET /books/:id
booksRouter.get('/:id', (req, res) => {
    const bookId = req.params.id;
    Book.findById(bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Error fetching book', message: err.message });
      });
  });
  
  module.exports = booksRouter;

  