document.getElementById('main').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const author = document.getElementById('author').value;
    const publisher = document.getElementById('publisher').value;
    const publishd = document.getElementById('publishd').value;

    // Validate if the book already exists
    let books = JSON.parse(localStorage.getItem('books')) || [];
    const bookExists = books.some(book => 
        book.name === name && 
        book.author === author && 
        book.publisher === publisher
    );

    if (bookExists) {
        alert(' Already exists.');
        return;
    }

    // Add the new book if it doesn't exist
    const newBook = {
        name: name,
        author: author,
        publisher: publisher,
        publishd: publishd
    };

    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));

    document.getElementById('main').reset();
    displayBooks();
});

function displayBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    let books = JSON.parse(localStorage.getItem('books')) || [];

    books.map((book, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.publisher}</td>
            <td>${book.publishd}</td>
            <td>
                <button onclick="editBook(${index})">Edit</button>
                <button onclick="deleteBook(${index}, 'main')">Delete</button>
            </td>
        `;
        
        // Append each row to the DOM
        bookList.appendChild(row);
        
        return row;  
    });
}
document.addEventListener('DOMContentLoaded', displayBooks);

function editBook(index) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    const book = books[index];

    document.getElementById('name').value = book.name;
    document.getElementById('author').value = book.author;
    document.getElementById('publisher').value = book.publisher;
    document.getElementById('publishd').value = book.publishd;

    books.splice(index,1);
    localStorage.setItem('books', JSON.stringify(books));

    displayBooks();
}
document.addEventListener('DOMContentLoaded', editBook);


function deleteBook(index,type) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books.splice(index,1);
    localStorage.setItem('books', JSON.stringify(books));

   
    if(type=="main"){
    displayBooks();
}
if(type=="render"){
    renderBooksList();
}
displayBooks();
    
}
window.onload = function () {
    displayBooks();
};
function deleteBookByAuthor(author) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books = books.filter(book => book.author !== author); 
    localStorage.setItem('books', JSON.stringify(books));
    displayAuthors(); 
    displayBooks();   
}

function deleteBookByPublisher(publisher) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books = books.filter(book => book.publisher !== publisher); 
    localStorage.setItem('books', JSON.stringify(books));
    displayPublishers(); 
    displayBooks();    
}

function displayAuthors() {
    const authorList = document.getElementById('author-list');
    authorList.innerHTML = '';  

    const books = JSON.parse(localStorage.getItem('books')) || []; 
 const authors = {};
books.map(book => {
    if (!authors[book.author]) {
        authors[book.author] = { books: [], count: 0 };
    }
    authors[book.author].books.push(book);
    authors[book.author].count += 1;  // Increment the book count for the author
});
    let index = 1;
    for (let author in authors) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index}</td>
            <td>${author}</td>
            <td>${authors[author].count}</td>
            <td><button onclick="deleteBookByAuthor('${author}')">Delete</button></td>
        `;
        authorList.appendChild(row); 
        index++;
    }
}

function displayPublishers() {
    const publisherList = document.getElementById('publisher-list');
    publisherList.innerHTML = '';  

    const books = JSON.parse(localStorage.getItem('books')) || [];
    const publishers = {};
books.map(book => {
    if (!publishers[book.publisher]) {
        publishers[book.publisher] = { books: [], count: 0 };
    }
    publishers[book.publisher].books.push(book);
    publishers[book.publisher].count += 1;  // Increment the book count for the publisher
});
    let index = 1;
    for (let publisher in publishers) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index}</td>
            <td>${publisher}</td>
            <td>${publishers[publisher].count}</td>
            <td><button onclick="deleteBookByPublisher('${publisher}')">Delete</button></td>
        `;
        publisherList.appendChild(row); 
        index++;
    }
}
function renderBooksList() {
    const renderList = document.getElementById('render-list'); 
    if (!renderList) {
        console.error("Element with ID 'render-list' not found");
        return;
    }

    renderList.innerHTML = '';  // Clear the table body

    let books = JSON.parse(localStorage.getItem('books')) || [];
    books.map((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.publisher}</td>
            <td>${book.publishd}</td>
            <td><button onclick="deleteBook(${index}, 'render')">Delete</button></td>
        `;
        renderList.appendChild(row);  // This action is outside the transformation, but we're using it here
    });
}

document.addEventListener('DOMContentLoaded', renderBooksList);
document.addEventListener('DOMContentLoaded', displayAuthors);
document.addEventListener('DOMContentLoaded', displayPublishers);




if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registered: ', registration);
        })
        .catch(registrationError => {
          console.log('ServiceWorker registration failed: ', registrationError);
        });
    });
  }
  