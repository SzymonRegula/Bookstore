const Book = require("../models/book");

exports.getAllBooks = (req, res) => {
  Book.find()
    .then((books) => {
      res.status(200).json({ message: "Books fetched!", books });
    })
    .catch((error) => {
      res.status(404).json(error);
    });
};

exports.addBook = (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    isbn: req.body.isbn,
  });
  book
    .save()
    .then(() => {
      res.status(201).json({ message: "Book added!", book });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.updateBook = (req, res) => {
  const id = req.params.id;
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    isbn: req.body.isbn,
  };
  Book.findByIdAndUpdate(id, book, { new: true })
    .then((updatedBook) => {
      res
        .status(200)
        .json({ message: `Book ${id} updated!`, book: updatedBook });
    })
    .catch((error) => {
      res.status(404).json(error);
    });
};

exports.deleteBook = (req, res) => {
  const id = req.params.id;
  Book.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: `Book ${id} deleted!` });
    })
    .catch((error) => {
      res.status(404).json(error);
    });
};
