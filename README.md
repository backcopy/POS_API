# Point of Sales API 

A simple API built with NodeJS designed for a backend customer invoice system with MongoDB. 

## Getting Started

### Prerequisites

* NodeJS 
* MongoDB
* MongooseJS 
* ExpressJS 

Everything else is covered in the npm included with this project. 

### Installation 

Do 'npm install' and then run app.js from the main directory. 

## API usage 

Listed below are the API codes. 


Invoice created and added to the database succesfully
```
{
  "status": {
    "message": "invoice_creation_success"
  }
}
```

One or more fields on the invoice are missing, invoice not created nor
added to the database. 
```
{
  "status": {
    "message": "invoice_creation_missing-data"
  }
}
```