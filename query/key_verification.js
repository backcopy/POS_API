// This file will contain the key verification module for the API
    
// Query system schematics 
    // Example based on a name query
        // URL --> /api/query/:key/ 
            // ==> SEND A POST OBJECT <== 
            // {
            // "key": KEY GOES HERE 
            // "name": NAME GOES HERE     
            // } 

        // RESULT ==> 

    // Multiple items are numbered. If the system returns 1 item, that means there is only
    // one record of that invoice in the database. 
        // JSON return 
//  {
//    matching_number: (0-10,000) // will include the number of matching invoices found
//    invoices: {
//        1: {
//            name: john smith
//            address: 123 watson street sydney 
//            services: 1x example service
//            balanceTotal: 85.00
//        },
//        2: {
//            name: john doe 
//            address: 321 george street sydney 
//            services: 1x sample service
//            balanceTotal: 49.95
//        }
//      }
//    }


    // NO RECORDS FOUND RESULT ==> 

//{
//  "status": "fail",
//  "message": "database_query-not-found"
//}



