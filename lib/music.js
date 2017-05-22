'use strict'

let books = [
    {title: "Exist", author:"Hovan", pubdate:2015},
    {title: "Assa", author:"Larin", pubdate:2015},
    {title: "Gorgorod", author:"Oxxymiron", pubdate:2015},
];

exports.getAll = (title) => {
    return books;
};

exports.get = (title) => {
    return books.find((item) => {
        return item.title === title;
    });
};

exports.delete = (title) => {

    const oldLength = books.length;
    let newBooks = books.filter((item) => {
        return item.title !== title;
    });
    books = newBooks;

    return {deleted: oldLength !== books.length, total: books.length };
};

exports.add = (newBook) => {
    const oldLength = books.length;

    let found = this.get(newBook.title);
    if (!found) {
        books.push(newBook);
    }
    
    return {added: oldLength !== books.length, total: books.length };
};
