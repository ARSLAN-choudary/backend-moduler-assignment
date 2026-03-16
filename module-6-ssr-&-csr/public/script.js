const bookList = document.getElementById('bookList');
const bookForm = document.getElementById('bookForm');

// 1. Fetch & Display Books
async function loadBooks() {
    const res = await fetch('/api/books');
    const result = await res.json();
    const books = result.data; 

    bookList.innerHTML = books.map(book => `
        <div class="book-card">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <button onclick="deleteBook(${book.id})">Delete</button>
        </div>
    `).join('');
}

// 2. Add New Book
bookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newBook = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        year: parseInt(document.getElementById('year').value),
        genre: document.getElementById('genre').value,
        pages: parseInt(document.getElementById('pages').value)
    };

    await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook)
    });
    
    bookForm.reset();
    loadBooks(); // List refresh without reload
});

// 3. Delete Book
async function deleteBook(id) {
    await fetch(`/api/books/${id}`, { method: 'DELETE' });
    loadBooks();
}

loadBooks();