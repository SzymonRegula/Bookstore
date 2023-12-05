const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  isbn: Number,
});

module.exports = mongoose.model("Book", bookSchema);
