const myLibrary = [];
const inputTitle=document.getElementById("title")
const inputAuthor=document.getElementById("author")
const inputPages=document.getElementById("pages")
const inputStatus=document.getElementById("status")
const confirmBtn=document.getElementById("confirm")

const addBtn = document.getElementById("addBook");
const dialog = document.getElementById("dialog");
const form=document.querySelector("form")

container=document.querySelector(".container")

function Book(title,author,pages,isRead) {
  this.title=title
  this.author=author
  this.pages=pages
  this.isRead=isRead
}

function addBookToLibrary(title,author,pages,isRead) {
  const book=new Book(title,author,pages,isRead)
  myLibrary.push(book)
}
function addBookToPage(myLibrary){
    container.innerHTML="<h3>S.NO</h3><h3>TITLE</h3><h3>AUTHOR</h3><h3>PAGES</h3><h3>STATUS</h3><h3>REMOVEBOOK</h3>"
    for ([index,book ] of myLibrary.entries()){
        container.innerHTML+=`<p id="serialno">${index+1}</p>
        <p id="title">${book.title}</p>
        <p id="author">${book.author}</p>
        <p id="pages">${book.pages}</p>
        <button class="statusbtn" data-index="${index}">${book.isRead ? "Read" :"Not Read"}</button>
        <button class="remove-btn" data-index="${index}">remove</button>`
    }
}


addBtn.addEventListener("click", () => {
  dialog.showModal();
  if (form) {
    form.reset();
  }
});
confirmBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    inputStatusAns=true
    if(inputAuthor.value && inputTitle.value){
        if(inputStatus.value=="notread"){
            inputStatusAns=false
        }
        if (!inputPages.value){
            inputPages.value=0
        }
        addBookToLibrary(inputTitle.value,inputAuthor.value,inputPages.value,inputStatusAns)
        addBookToPage(myLibrary)
        dialog.close()
        if (form) {
            form.reset();
        }
    }
    else{
        alert("enter the values")
    }
})
container.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.getAttribute("data-index"); // Get the index of the book to remove
      myLibrary.splice(index, 1); // Remove the book from the library
      addBookToPage(myLibrary); // Update the displayed books
      console.log(`Removed book at index ${index}`);
    }
  });
container.addEventListener("click", (e) => {
    if (e.target.classList.contains("statusbtn")) {
      const index = e.target.getAttribute("data-index"); // Get the index of the book to remove
      if(e.target.textContent=="Read"){
        e.target.textContent="Not Read"
        myLibrary[index].isRead=false
      }
      else if(e.target.textContent=="Not Read"){
        e.target.textContent="Read"
        myLibrary[index].isRead=true
      }
      addBookToPage(myLibrary); // Update the displayed books
    }
  });
