'use strict'; 

var express = require('express'); 
var router = express.Router(); 
var Invoice = require('./schema').Invoice; 
var evalmon = require('./evaluation.js'); 

 
// create invoice
router.post('/', function(req, res, next){
    var api_request_content = req.body; 
    // api json fields evaluation 
    if (evalmon.eval_api_content(api_request_content) === true){
        var err = new Error('invoice_creation_missing-data'); 
            err.status = 500; 
                return next(err); 
    } 
    // account balance evaluation 
    if (evalmon.eval_api_balance(api_request_content) === true ){
        var err = new Error('invoice_creation_balance-error'); 
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