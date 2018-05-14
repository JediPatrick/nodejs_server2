/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');


const Trip = require("../models/trip");
const checkAuth = require('../middleware/check-auth');




router.get("/:userID", checkAuth, (req, res, next) => {
    const userid2 = req.params.userID;
    Trip.find({ userid: userid2})
    .exec()
    .then(docs => {
      console.log(docs);

      res.status(200).json(docs);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.post("/createtrip", checkAuth, (req, res, next) => {
  const trip = new Trip({
    _id: new mongoose.Types.ObjectId(),
    date: req.body.date,
    effect: req.body.effect,
    name: req.body.name,
    length: req.body.length,
    userid: req.body.userid,
    time_length: req.body.time_length
  });
  trip
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        createdtrip: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.delete('/:tripID', checkAuth, (req, res, next)=> {
    res.status(200).json({
        message: 'updated'
    });
});

module.exports =router;