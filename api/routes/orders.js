/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Trip = require("../models/trip");

router.get("/:userID", (req, res, next) => {
    const userid2 = req.params.userID;
    Trip.find({ userid: userid2})
    .exec()
    .then(docs => {
      console.log(docs);
      //   if (docs.length >= 0) {
      res.status(200).json(docs);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports =router;