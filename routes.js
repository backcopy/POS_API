'use strict'; 

var express = require('express'); 
var router = express.Router(); 
var Invoice = require('./schema').Invoice; 

// create a test invoice 
router.post('/', function(req, res, next){
    if (!req.body.name || !req.body.address ||
       !req.body.services || !req.body.balanceTotal){
        var err = new Error('invoice_creation_missing-data'); 
        err.status = 500; 
        return next(err); 
    }
    var invoice = new Invoice(req.body); 
    invoice.save(function(err, invoice){
        if (err) return next(err); 
        res.status(201); 
        res.json({
            status: "invoice_creation_success"
        }); 
    })
}); 


module.exports = router; 