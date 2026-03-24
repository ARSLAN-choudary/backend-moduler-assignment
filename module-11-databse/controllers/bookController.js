const bookModel = require('../models/book');

const bookController = {
    getAllBooks: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = await bookModel.findAll(page, limit);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getBookById: async (req, res) => {
        try {
            const book = await bookModel.findById(req.params.id);
            if (!book) return res.status(404).json({ message: "Book not found" });
            res.json(book);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createBook: async (req, res) => {
        try {
            const newBook = await bookModel.create(req.body);
            res.status(201).json(newBook);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateBook: async (req, res) => {
        try {
            const updated = await bookModel.update(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteBook: async (req, res) => {
        try {
            await bookModel.destroy(req.params.id);
            res.json({ message: "Book deleted" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

// YEH LINE SABSE ZAROORI HAI
module.exports = bookController;