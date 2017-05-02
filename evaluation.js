'use strict'; 

// All evaluation modules will be included in this file. 



module.exports = {   
    
// module: evaluation for testing whether the POST
// data JSON objects are properly filled. 
eval_api_content: function (api_request_content){
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
    }, 
    
// module: evaluation to test whether returned balanceTotal
// meets the parameters. 
    // note: '$' dollarsign has been stripped and will not store. 
        // <== VALID ==> 
            // 0.00
            // 00.00
            // 000.00
            // 0000.00 
eval_api_balance: function (api_request_content){
        var balanceTotal = api_request_content.balanceTotal; 
        if(balanceTotal.length < 4 || balanceTotal.length > 7){
            return true;  
        }
    }
} // end of export. 