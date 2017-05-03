'use strict'; 

var express = require('express'); 
var router = express.Router(); 
var Invoice = require('./schema').Invoice; 
var evalmon = require('./evaluation.js'); 

// temporary keys
var keys_db = ['9T5ROmeTU5UgXAXySKRE','4AeVU38iX07g6UiWiAwG', 'mxDovxzmuX78732THjRB']; 

// API key system 

router.post('/key/:key', function(req, res, next){
    if (req.params.key !== keys_db[0]){
        var err = new Error('invoice_creation_invalid-key'); 
            err.status = 500; 
             return next(err);
    }
    res.json({
        status: "success",
        key: req.params.key
    }); 
})


// create invoice
router.post('/', function(req, res, next){
    var api_request_content = req.body; 
    
    
    
    
    evalmon.eval_api_balanceContent(api_request_content); 
    // api json fields evaluation 
    if (evalmon.eval_api_content(api_request_content) === true){
        var err = new Error('invoice_creation_missing-data'); 
            err.status = 500; 
                return next(err); 
    } 
    // invoice balance evaluation (too large or too small)
    if (evalmon.eval_api_balancePlace(api_request_content) === true){
        var err = new Error('invoice_creation_balance-error-0'); 
            err.status = 500; 
                return next(err); 
    }
    // invoice balance evaluation (contains letter)
    if (evalmon.eval_api_balanceContent(api_request_content) === true){
        var err = new Error('invoice_creation_balance-error-1'); 
            err.status = 500; 
                return next(err); 
        
    }
    // uppercase functionality 
    req.body = evalmon.eval_api_upperCase(api_request_content); 
    
    // prepare invoice for database insertion 
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