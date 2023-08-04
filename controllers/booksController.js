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

  // POST /books
booksRouter.post('/', (req, res) => {
    const { id, title, description, year, quantity, imageURL } = req.body;
    const newBook = new Book({
      id,
      title,
      description,
      year,
      quantity,
      imageURL,
    });
  
    newBook
      .save()
      .then((createdBook) => {
        res.status(201).json(createdBook);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Error creating book', message: err.message });
      });
  });
  
  // PUT /books/:id
booksRouter.put('/:id', (req, res) => {
    const bookId = req.params.id;
    const updatedBookData = req.body;
  
    Book.findByIdAndUpdate(bookId, updatedBookData, { new: true })
      .then((updatedBook) => {
        if (!updatedBook) {
          return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(updatedBook);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Error updating book', message: err.message });
      });
  });
  
  // DELETE /books/:id
booksRouter.delete('/:id', (req, res) => {
    const bookId = req.params.id;
  
    Book.findByIdAndRemove(bookId)
      .then((deletedBook) => {
        if (!deletedBook) {
          return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
      })
      .catch((err) => {
        res.status(500).json({ error: 'Error deleting book', message: err.message });
      });
  });
  