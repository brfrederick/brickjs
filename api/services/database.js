/**
* Wrapper for database setup and connections
* @author Braxton Frederick
* @file
*/

// require modules
var mongoose = require('mongoose');

// settings and configuration
var url = process.env.MONGOLAB_URI || "mongodb://localhost";

var db = mongoose.connect(url, function(err){
  if(err){
    console.log("Could not connect to the database");
    throw err;
  }
});

module.exports = db;
