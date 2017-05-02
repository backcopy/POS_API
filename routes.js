'use strict'; 

var express = require('express'); 
var router = express.Router(); 
var Invoice = require('./schema').Invoice; 

// TEMPORARY PLACE FOR EVALUATION MODULES 

    // module: evaluation for testing whether the POST
    // data JSON objects are properly filled. 
    function eval_api_content(api_request_content){
        if (
        !api_request_content.name ||
        !api_request_content.address || 
        !api_request_content.services ||
        !api_request_content.balanceTotal ||
            api_request_content.name.length < 3 ||
            api_request_content.address.length < 3 ||
            api_request_content.services.length < 3 ||
            api_request_content.balanceTotal.length < 3){
            // return true if evaluation deems that the POST data
            // did not contain all the appropritae designated data. 
            // true = bad 
        return true;   
        }
    }; 

    // module: evaluation to test whether returned balanceTotal
    // meets the parameters. 
        // note: '$' dollarsign has been stripped and will not store. 
    // <== VALID ==> 
        // 0.00
        // 00.00
        // 000.00
        // 0000.00 
    function eval_api_balance(api_request_content){
        var balanceTotal = api_request_content.balanceTotal; 
        if(balanceTotal.length < 4 || balanceTotal.length > 7){
            return true;  
        }
    }; 


// create a test invoice 
router.post('/', function(req, res, next){
    var api_request_content = req.body; 
    // api json fields evaluation 
    if (eval_api_content(api_request_content) === true){
        var err = new Error('invoice_creation_missing-data'); 
            err.status = 500; 
                return next(err); 
    } 
    // account balance evaluation 
    if (eval_api_balance(api_request_content) === true ){
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