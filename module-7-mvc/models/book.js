// models/book.js
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" }
];

exports.findAll = (query) => {
  // Logic for filtering could go here
  return books;
};

exports.findById = (id) => {
  return books.find(b => b.id === parseInt(id));
};

exports.create = (data) => {
  const newBook = { id: books.length + 1, ...data };
  books.push(newBook);
  return newBook;
};

exports.update = (id, data) => {
  const index = books.findIndex(b => b.id === parseInt(id));
  if (index === -1) return null;
  books[index] = { ...books[index], ...data };
  return books[index];
};

exports.destroy = (id) => {
  const index = books.findIndex(b => b.id === parseInt(id));
  if (index === -1) return false;
  books.splice(index, 1);
  return true;
};