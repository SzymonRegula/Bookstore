const express = require("express");

const cors = require("cors");

require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.eajwgao.mongodb.net/books?retryWrites=true&w=majority`
);

const app = express();

app.use(cors());

const morgan = require("morgan");
app.use(morgan("dev"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const bookRoutes = require("./api/routes/books");
const userRoutes = require("./api/routes/users");
app.use("/books", bookRoutes);
app.use("/users", userRoutes);

app.use((req, res) => {
  res.status(200).json({ message: "It works!" });
});

module.exports = app;
