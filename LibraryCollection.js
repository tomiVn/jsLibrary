class LibraryCollection {

    constructor(capacity) {
        this.capacity = capacity;
        this.books = [];
    }

    addBook(bookName, bookAuthor) {
        if (this.books.length == this.capacity) {
            throw new Error('Not enough space in the collection.');
        }
        if (typeof bookName == 'string' && typeof bookAuthor == 'string') {
            let bookObj = { bookName, bookAuthor, payed: false };
            this.books.push(bookObj);
            return `The ${bookName}, with an author ${bookAuthor}, collect.`;
        }
    }

    payBook(bookName) {
        let book = this.books.find(b => b.bookName == bookName);
        if (book == undefined) {
          throw new Error (`${bookName} is not in the collection.`);
        }else if(book.payed == true){
            throw new Error (`${bookName} has already been paid.`);
        }else{
            book.payed = true;
            return `${bookName} has been successfully paid.`;
        }
    }

    removeBook(bookName) {
        let bookIndex = this.books.findIndex(b => b.bookName == bookName);
        if (bookIndex == -1) {
          throw new Error (`The book, you're looking for, is not found.`);
        }else if(this.books[bookIndex].payed == false){
            throw new Error (`${bookName} need to be paid before removing from the collection.`);
        }else{
         this.books.splice(bookIndex, 1);
         return `${bookName} remove from the collection.`;
        }
    }

    getStatistics(bookAuthor) {
        let result = '';
        if(bookAuthor == undefined || bookAuthor == ''){
          result += `The book collection has ${ this.capacity - this.books.length } empty spots left.\n`
          this.books.sort((a, b) => a.bookName.localeCompare(b.bookName)).forEach(b =>{
            //"{bookName} == {bookAuthor} - {Has Paid / Not Paid}."
            result += `${b.bookName} == ${b.bookAuthor} - ${b.payed == true ? 'Has Paid' : 'Not Paid'}.\n`
          });
          return result.slice(0, result.length -1);
        }else{
          let index = this.books.findIndex(b => b.bookAuthor == bookAuthor);
          if(index == -1){
            throw new Error (`${bookAuthor} is not in the collection.`);
          }
          return `${this.books[index].bookName} == ${this.books[index].bookAuthor} - ${this.books[index].payed == true ? 'Has Paid' : 'Not Paid'}.`;
        }
    }
}

const library = new LibraryCollection(5)
library.addBook('Don Quixote', 'Miguel de Cervantes');
library.payBook('Don Quixote');
library.addBook('In Search of Lost Time', 'Marcel Proust');
library.addBook('Ulysses', 'James Joyce');
console.log(library.getStatistics());


