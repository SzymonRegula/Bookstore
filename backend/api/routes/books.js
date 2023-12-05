const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();
const BookController = require("../controllers/books");

router.get("/", BookController.getAllBooks);

router.post("/", checkAuth, BookController.addBook);

router.put("/:id", checkAuth, BookController.updateBook);

router.delete("/:id", checkAuth, BookController.deleteBook);

module.exports = router;
