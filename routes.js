'use strict'; 

var express = require('express'); 
var router = express.Router(); 
var Invoice = require('./schema').Invoice; 
var Keys = require('./schema').Keys; 
var evalmon = require('./evalmon/evaluation.js'); 

// master key, predefined and should be very long. 
    // WARNING: DO NOT USE THIS IN PRODUCTION, IT IS 
    // NOT SECURE. 
var keys_db = ['secret']; 

// API key generation system 
    // This will create an API key using a secret pre-defined
    // key and store it in the database under "keys" collection
        // must include the '/create/:key-here' extension. 
router.post('/key/create/:key', function(req, res, next){
    if (req.params.key !== keys_db[0]){
        var err = new Error('invoice_creation_invalid-key'); 
            err.status = 500; 
             return next(err);
    }
    var key = new Keys(req.body); 
            key.save(function(err, key){
                if (err) return next(err); 
                    res.status(201); 
    res.json({
        status: "success",
        key_created: req.body.key
        }); 
    }); 
}); 

// API query system 
    // This will allow a person to query using the /query/:key/ extension

    // Query system schematics 
        // /query/:key/ 
            // SEND A POST OBJECT; 
            // {
            // "name": NAME GOES HERE     
            // } 

router.post("/query/:key/", function(req, res, next){
   res.json({
       status: "success", 
       requested_data: req.params.key
   }) 
}); 


// create invoice
router.post('/', function(req, res, next){ 
    var api_request_content = req.body; 

    
    var system_api_status = evalmon.core(api_request_content); 
    
    // uppercase functionality 
    req.body = evalmon.eval_api_upperCase(api_request_content); 
    
    // prepare invoice for database insertion 
        var invoice = new Invoice(req.body); 
            invoice.save(function(err, invoice){
                if (err) return next(err); 
                    res.status(201); 
            res.json({
        status: system_api_status
        }); 
    })
}); 


module.exports = router; 