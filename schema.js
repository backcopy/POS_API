'use strict'; 

var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
 
var InvoiceSchema = new Schema({
    name: {type: String},
    address: {type: String}, 
    services: {type: String},
    balanceTotal: {type: String}
}); 

// API KEY SCHEMA 
var ApiKeySchema = new Schema({
    key: {type: String}
}); 


var Invoice = mongoose.model("Invoice", InvoiceSchema); 
var Keys = mongoose.model("Keys", ApiKeySchema); 

module.exports.Invoice = Invoice; 
module.exports.Keys = Keys; 