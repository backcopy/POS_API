'use strict'; 

var express = require('express'); 
var router = express.Router(); 
var Invoice = require('./schema').Invoice; 

// create a test invoice 
router.post('/', function(req, res, next){
    console.log(req.body); 
    var invoice = new Invoice(req.body); 
    invoice.save(function(err, invoice){
        if (err) return next(err); 
        res.status(201); 
        res.json({
            returned: "created"
        }); 
    })
}); 


module.exports = router; 