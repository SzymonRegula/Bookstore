const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = (req, res) => {
  User.findOne({ login: req.body.login })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(409).json({ message: "Login already exists!" });
      }

      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
          login: req.body.login,
          password: hash,
        });
        user
          .save()
          .then(() => {
            res.status(201).json({ message: "User added!" });
          })
          .catch((error) => {
            res.status(500).json(error);
          });
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.login = (req, res) => {
  User.findOne({ login: req.body.login })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Incorrect login or password!" });
      }
      bcrypt.compare(req.body.password, user.password).then((result) => {
        if (!result) {
          return res
            .status(401)
            .json({ message: "Incorrect login or password!" });
        }
        const token = jwt.sign(
          { login: user.login, userId: user._id },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        return res.status(200).json({ message: "Auth successful!", token });
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
