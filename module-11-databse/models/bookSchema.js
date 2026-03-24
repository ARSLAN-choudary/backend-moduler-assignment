const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number },
    genre: { type: String, enum: ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Tech'] },
    pages: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);