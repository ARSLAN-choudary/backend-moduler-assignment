const express = require('express');
const { body, validationResult } = require('express-validator');
let books = require('../data/books');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// Validation Rules
const validateBook = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('year').isInt({ min: 1000 }).withMessage('Valid year required'),
  body('pages').isInt({ min: 1 }).withMessage('Pages must be positive'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];



// 1. GET all books with Filtering, Sorting & Pagination
router.get('/', asyncHandler(async (req, res) => {
  let { author, genre, year, sort, page = 1, limit = 5 } = req.query;
  let filteredBooks = [...books];

  // Filtering
  if (author) filteredBooks = filteredBooks.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  if (genre) filteredBooks = filteredBooks.filter(b => b.genre === genre);
  if (year) filteredBooks = filteredBooks.filter(b => b.year == year);

  // Sorting
  if (sort) {
    filteredBooks.sort((a, b) => a[sort] > b[sort] ? 1 : -1);
  }

  // Pagination
  const total = filteredBooks.length;
  const skip = (page - 1) * limit;
  const data = filteredBooks.slice(skip, skip + parseInt(limit));

  res.json({
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit),
    data
  });
}));

// 2. GET single book
router.get('/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// 3. POST - Create Book
router.post('/', validateBook, (req, res) => {
  const newBook = { id: books.length + 1, ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
});

// 4. PUT - Full Update
router.put('/:id', validateBook, (req, res) => {
  const index = books.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Not found" });
  books[index] = { id: parseInt(req.params.id), ...req.body };
  res.json(books[index]);
});

// 5. DELETE
router.delete('/:id', (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.status(204).send();
});

module.exports = router;