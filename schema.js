'use strict'; 

var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
 
var InvoiceSchema = new Schema({
    name: {type: String},
    address: {type: String}, 
    services: {type: String},
    balanceTotal: {type: String}
}); 

var Invoice = mongoose.model("Invoice", InvoiceSchema); 

module.exports.Invoice = Invoice; 