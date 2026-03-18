// controllers/bookController.js
const Book = require('../models/book');

exports.getAll = (req, res, next) => {
  try {
    const data = Book.findAll(req.query);
    res.json({ data });
  } catch (err) { next(err); }
};

exports.getOne = (req, res, next) => {
  try {
    const book = Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) { next(err); }
};

exports.create = (req, res, next) => {
  try {
    const newBook = Book.create(req.body);
    res.status(201).json(newBook);
  } catch (err) { next(err); }
};

exports.update = (req, res, next) => {
  try {
    const updated = Book.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Book not found" });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.remove = (req, res, next) => {
  try {
    const deleted = Book.destroy(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Book not found" });
    res.status(204).send();
  } catch (err) { next(err); }
};