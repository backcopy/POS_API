'use strict'; 

var express = require('express'); 
var app = express(); 
var routes = require('./routes'); 
var jsonParser = require('body-parser').json; 

// Add JSON parser module to our express middleware
app.use(jsonParser()); 

// Connect mongoose to MongoDB 
    // Coming soon 

// Delcare port for ExpressJS to use 
var port_for_express = 3333; 

// Declare the routes for /api 
app.use('/api', routes); 


app.listen(port_for_express, function(){
    console.log('EXPRESS SERVER STATUS: RUNNING'); 
}); 


