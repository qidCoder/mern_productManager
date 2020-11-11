//import the model
//Triggers the code in pm.model to be executed and export the model
const Product = require("../models/pm.model");

//export an object with a bunch of methods in it
module.exports = {
    //the function receives a request - a POST request from the form on the UI
    //key:value pair pattern, long-form for methods
    create: function( req, res){
        console.log("create method executed");

        Product.create(req.body)
        .then( (product) => {
            console.log("product created:", product)
            //we get back the product that was created by the databas and respond with JSON and pass back that product
            //product is the product from the DB now, which has a DB _id, createdAt, etc...
            //send it back in the response to the client
            res.json(product);
        })
        .catch( (err) => {
            res.json(err);
        })
    },

    //key:value pair pattern, short-hand for methods
    //retrieve all products created in the database
    getAll(req, res){
        console.log("getAll method executed");

        //if you pass in no arguments, it finds everything
        Product.find()
        .then( (products) => {
            res.json(products);
        })
        .catch( (err) => {
            res.json(err);
        })
    },

    //retrieve a specific record
    //specific record comes from the id passed in through the URL (parameters)
    getOne(req,res){
        console.log("getOne method executed", "url params: ", req.params);

        //find() always returns an array even if you only have one item. That's why we can use findById() to just get a single object back
        Product.findById(req.params.id)
        .then( (product) => {
            res.json(product);
        })
        .catch( (err) => {
            res.json(err);
        })
    },

    delete(req,res){
        console.log("delete method executed", "url params: ", req.params);

        //find() always returns an array even if you only have one item. That's why we can use findById() to just get a single object back
        Product.findByIdAndDelete(req.params.id)
        .then( (product) => {
            res.json(product);
        })
        .catch( (err) => {
            res.json(err);
        })
    },

    update(req,res){
        console.log("update method executed", "url params: ", req.params);

        //req.body is equivalent to request.post in Django
        //req.body is the new updated info from the submitted form
        //form data is in the req.body - which is the body of the request, the main content of the request
        Product.findByIdAndUpdate(req.params.id, req.body, {
            //we have to validate the data because it doesn't do it by default on updates
            //this is because if it's in the database already, that means it already passed validations
            runValidators: true,
            //return the updated object rather than the old info
            new: true
        })
        .then( (product) => {
            res.json(product);
        })
        .catch( (err) => {
            res.json(err);
        })
    }

}