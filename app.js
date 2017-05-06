'use strict'; 

var routes = require('./routes');
var express = require('express'); 
var app = express();  
var jsonParser = require('body-parser').json; 

// Add JSON parser module to our express middleware
app.use(jsonParser()); 


// Connect mongoose to MongoDB 
    // Database name has been set to 'invoice_db' 
var mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/invoice_db'); 
var db = mongoose.connection; 

// If MongoDB or mongoose throw an error, return this 
db.on("error", function(err){
    console.error('The following database error occoured: ', err); 
}); 


// Message to console to validate connection status 
db.once("open", function(){
    console.log('DATABASE CONNECTION STATUS: OK'); 
}); 

// Declare the routes for /api 
app.use('/api', routes); 

// 404 error, forward to error system
app.use(function(req, res, next){
    var err = new Error("Not found"); 
    err.status = 404; 
    next(err); 
}); 

// Error system 
app.use(function(err, req, res, next){
    // default value is 500 
    res.status(err.status || 500); 
    res.json({
        status: 'fail', 
        message: err.message
    }); 
}); 



// Delcare port for ExpressJS to use 
var port_for_express = 3333; 

app.listen(port_for_express, function(){
    console.log('WEB SERVER STATUS: RUNNING'); 
}); 


