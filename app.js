'use strict'; 

var express = require('express'); 
var app = express(); 
var routes = require('./routes'); 
var jsonParser = require('body-parser').json; 
var mongoose = require('mongoose'); 

// Add JSON parser module to our express middleware
app.use(jsonParser()); 

// Connect mongoose to MongoDB 
    // Database name has been set to 'invoice_db' 
mongoose.connect('mongodb://localhost:27017/invoice_db')

// If MongoDB or mongoose throw an error, return this 
db.on("error", function(err){
    console.error('The following database error occoured: ', err); 
}); 


// Message to console to validate connection status 
db.once("open", function(){
    console.log('DATABASE CONNECTION STATUS: OK'); 
}); 






// Delcare port for ExpressJS to use 
var port_for_express = 3333; 

// Declare the routes for /api 
app.use('/api', routes); 


app.listen(port_for_express, function(){
    console.log('EXPRESS SERVER STATUS: RUNNING'); 
}); 


