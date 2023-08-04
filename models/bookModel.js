const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
  });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
