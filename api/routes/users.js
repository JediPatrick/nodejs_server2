const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const Users = require("../models/users");

router.post("/signup", (req, res, next) => {
  Users.find({ name: req.body.name })
    .exec()
    .then(users => {
      if (users.length >= 1) {
        return res.status(409).json({
          message: "name exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const users = new Users({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              password: hash
            });
            users
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                  //message: result
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  Users.find({ name: req.body.name })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              name: user[0].name,
              userId: user[0]._id
            },
            "secrets",
            {
                expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            userId: user[0]._id,
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:userId", (req, res, next) => {
  Users.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;