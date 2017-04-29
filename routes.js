'use strict'; 

var express = require('express'); 
var router = express.Router(); 
var Invoice = require('./invoice').Invoice; 

router.get('/', function(req, res, next){
    res.json({
        status: "ok"
    })
}); 


module.exports = router; 