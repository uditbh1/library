// Book class to represent a single book
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

// Library class to manage a collection of books
class Library {
  constructor() {
    this.books = [];
  }

  // Add a new book to the library
  addBook(book) {
    this.books.push(book);
  }

  // Remove a book from the library by its index
  removeBook(index) {
    this.books.splice(index, 1);
  }

  // Toggle the read status of a book
  toggleReadStatus(index) {
    if (this.books[index]) {
      this.books[index].isRead = !this.books[index].isRead;
    }
  }

  // Render the list of books into the provided container element
  render(container) {
    // Create a header row
    container.innerHTML =
      `<h3>S.NO</h3>
       <h3>TITLE</h3>
       <h3>AUTHOR</h3>
       <h3>PAGES</h3>
       <h3>STATUS</h3>
       <h3>REMOVE BOOK</h3>`;

    // Loop through the books array and add each book to the page
    this.books.forEach((book, index) => {
      container.innerHTML += `
        <p class="serialno">${index + 1}</p>
        <p class="title">${book.title}</p>
        <p class="author">${book.author}</p>
        <p class="pages">${book.pages}</p>
        <button class="statusbtn" data-index="${index}">
          ${book.isRead ? "Read" : "Not Read"}
        </button>
        <button class="remove-btn" data-index="${index}">
          Remove
        </button>`;
    });
  }
}

// Instantiate a new Library
const myLibrary = new Library();

// Select DOM elements
const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const inputStatus = document.getElementById("status");
const confirmBtn = document.getElementById("confirm");

const addBtn = document.getElementById("addBook");
const dialog = document.getElementById("dialog");
const form = document.querySelector("form");
const container = document.querySelector(".container");

// Open the dialog to add a new book
addBtn.addEventListener("click", () => {
  dialog.showModal();
  if (form) {
    form.reset();
  }
});

// Confirm adding the book to the library
confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // Determine the read status based on the input value
  let isReadStatus = inputStatus.value !== "notread";
  
  // Ensure title and author fields are provided
  if (inputTitle.value && inputAuthor.value) {
    // Set default pages to 0 if no value is provided
    const pages = inputPages.value ? inputPages.value : 0;

    // Create a new Book instance and add it to the library
    const book = new Book(inputTitle.value, inputAuthor.value, pages, isReadStatus);
    myLibrary.addBook(book);
    
    // Update the page display and close the dialog
    myLibrary.render(container);
    dialog.close();
    
    if (form) {
      form.reset();
    }
  } else {
    alert("Please enter the title and author values");
  }
});

// Listen for clicks on the container to remove a book
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const index = parseInt(e.target.getAttribute("data-index"), 10);
    myLibrary.removeBook(index);
    myLibrary.render(container);
  }
});

// Listen for clicks on the container to toggle the read status of a book
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("statusbtn")) {
    const index = parseInt(e.target.getAttribute("data-index"), 10);
    myLibrary.toggleReadStatus(index);
    myLibrary.render(container);
  }
});
