/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


const express = require('express');
const app = express();
const morganlog = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:JKZFmd2TpWD41osC@cluster0-ksida.mongodb.net/test?retryWrites=true"
);

const tripRoutes = require('./api/routes/trip');
const usersRoutes = require('./api/routes/users');

app.use(morganlog('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use('/trip', tripRoutes);
app.use('/users', usersRoutes);



app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
