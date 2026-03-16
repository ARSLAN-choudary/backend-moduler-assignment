const path = require('path');

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static Files Setup
app.use(express.static(path.join(__dirname, 'public')));

// EJS Route (Server-side rendering)
app.get('/books', (req, res) => {
  res.render('books', { title: 'Arslan\'s Book Store', books: booksArray }); 
});