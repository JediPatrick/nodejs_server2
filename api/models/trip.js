/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    date: String,
    effect: Number,
    name: String,
    length: Number,
    userid: mongoose.Schema.Types.ObjectId,
    time_length: Number
});

module.exports = mongoose.model('Trip', tripSchema);