import { useContext, useState } from "react";
import { addBook, updateBook } from "../../services/endpoints/books";
import { BooksContext } from "../../store/books-context";
import Button from "../Button/Button";
import classes from "./BookForm.module.css";

function BookForm({ id = null }) {
  const { books, setBooks } = useContext(BooksContext);
  const [book] = useState(id ? books.find((book) => book._id === id) : null);

  const submitHandler = (event) => {
    event.preventDefault();

    const book = {
      title: event.target.title.value,
      author: event.target.author.value,
      genre: event.target.genre.value,
      isbn: event.target.isbn.value,
    };

    if (id) {
      updateBook(id, book)
        .then((response) => {
          const newBook = response.data.book;
          setBooks((prevBooks) =>
            prevBooks.map((prevBook) =>
              prevBook._id === newBook._id ? newBook : prevBook
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      addBook(book)
        .then((response) => {
          setBooks((prevBooks) => prevBooks.concat(response.data.book));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" defaultValue={book?.title} />
      </div>
      <div className={classes.control}>
        <label htmlFor="author">Author</label>
        <input type="text" id="author" defaultValue={book?.author} />
      </div>
      <div className={classes.control}>
        <label htmlFor="genre">Genre</label>
        <input type="text" id="genre" defaultValue={book?.genre} />
      </div>
      <div className={classes.control}>
        <label htmlFor="isbn">ISBN</label>
        <input type="number" step={1} id="isbn" defaultValue={book?.isbn} />
      </div>
      <div className={classes.actions}>
        <Button type="submit">{id ? `Update book` : `Add book`}</Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </form>
  );
}

export default BookForm;
