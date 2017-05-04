'use strict'; 

// All evaluation modules will be included in this file. 

function api_content(api_request_content){
   // console.log(api_request_content.name); 
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
    //   console.log('API JSON IS OK')
        return true;   
    }
}; 


module.exports = {   
    

core: function(api_request_content){
    // 1st checker function 
    if (api_content(api_request_content) === true){
        return {
            "status": "fail", 
            "error": 'invoice_creation_missing-data'
        }; 
    }
    
    
}, 
    
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
eval_api_balancePlace: function (api_request_content){ 
        var balanceTotal = api_request_content.balanceTotal; 
        if(balanceTotal.length < 4 || balanceTotal.length > 7){
            return true;  
        }
    },
    
eval_api_balanceContent: function(api_request_content){
    let ticker = 0; 
    
    // loop to test if the balance contains a letter 
    for (let i=0;i<api_request_content.balanceTotal.length;i++){ 
        let h = '' + api_request_content.balanceTotal[i];
        // test tables, numbers 0 - 9 and the dot
        if(h !== '0' && h !== '1' && h !== '2' && 
          h !== '3' && h !== '4' && h !== '5' && 
          h !== '6' && h !== '7' && h !== '8' && 
          h !== '9' && h !== '.'){
            ticker++  
        }  
    } 
if (ticker > 0){
    // true = bad
        return true; 
     }
}, 

// module: this module will convert all JSON input to uppercase before
// inserting into the database. 
eval_api_upperCase: function(api_request_content){
   api_request_content.name = api_request_content.name.toUpperCase(); 
    api_request_content.address = api_request_content.address.toUpperCase(); 
        api_request_content.services = api_request_content.services.toUpperCase(); 
    return api_request_content; 
}
    
    
} // end of export. 