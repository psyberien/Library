function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
    this.info = function(){
        return {title: `${this.title}`, author: `${this.author}`, pages: `${this.pages}`, read: `${this.read}`, id: `${this.id}` };
    }
}

 let library = [];

function addBookToLibrary(title, author, pages, read){
    Object.setPrototypeOf(addBookToLibrary.prototype, Book.prototype);
    Book.call(this, title, author, pages, read);
    library.push(this.info());
}


function displayLibrary(){
    const myContent = document.querySelector(".content");
    myContent.replaceChildren();

    for(let book of library){
        const card = document.createElement("div");
        card.classList.add("card")


        const myH1 = document.createElement("h1");
        myH1.textContent = `${book.title}`;

        const myP = document.createElement("p");
        myP.textContent = "by";

        const myH2 = document.createElement("h2");
        myH2.textContent = `${book.author}`;

        const myP1 = document.createElement("p");
        myP1.textContent = `${book.pages} pages`;

        const myP2 = document.createElement("p");
        myP2.textContent = `${book.read}`;

        const myButton1 = document.createElement("button");
        myButton1.textContent = "Read Status";
        myButton1.style.backgroundColor = "green";
        myButton1.classList.add("buttonOne");
        myButton1.addEventListener("click", function() {
            library.map(value => {
                if(book.id === value.id){
                    book.read === "Not yet" ? book.read = "Finished" : book.read = "Not yet";
                }
            })
            displayLibrary();
        });

        const myButton2 = document.createElement("button");
        myButton2.textContent = "Remove Book";
        myButton2.style.backgroundColor = "orangered";
        myButton2.addEventListener("click", function() {
            library = library.filter(value => (book.id !== value.id));
            displayLibrary();
        });
 
        card.appendChild(myH1);
        card.appendChild(myP);
        card.appendChild(myH2);
        card.appendChild(myP1);
        card.appendChild(myP2);
        card.appendChild(myButton1);
        card.appendChild(myButton2);
        myContent.appendChild(card);  
    }
}

const modal =  document.querySelector("#myModal");
const btn = document.querySelector("#openModal");

const addBook = document.querySelector("#addBook");
const myForm = document.querySelector("#bookForm")

myForm.addEventListener("submit", function(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const read = formData.get("read");

    addBookToLibrary(title, author, pages, read);
   modal.style.display = "none";
   displayLibrary();
});


function openModal(){
    modal.style.display = "block";
}

function closeModal(){
    modal.style.display = "none";
}

 btn.addEventListener("click", function(event){
    myForm.reset();
    openModal();
 });

 const span = document.querySelector(".close");

 span.addEventListener("click", function(event){
    closeModal();
 });
