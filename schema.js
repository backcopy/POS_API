'use strict'; 

var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
 
var InvoiceSchema = new Schema({
    name: {type: String, default: 'N/A'},
    address: {type: String, default: 'N/A'}, 
    services: {type: String, default: 'N/A'},
    balanceTotal: {type: String, default: 'N/A'}
}); 

var Invoice = mongoose.model("Invoice", InvoiceSchema); 

module.exports.Invoice = Invoice; 