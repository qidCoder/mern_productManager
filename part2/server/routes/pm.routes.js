//import the controller so when a URL is visited, the request will be routed to a particular function in the controller which triggers the object with all the mothods on it
const productController = require("../controllers/pm.controller");

//export a function that needs access to our app since it will add the HTTP methods and URL to it
module.exports = (app) => {
    app.post("/api/products", productController.create);
    //Django equivalent path("/api/products", views.products)
    app.get("/api/products", productController.getAll);
    app.get("/api/products/:id", productController.getOne);// :id is a url parameter that will be added to req.params.id
    app.delete("/api/products/:id", productController.delete);
    app.put("/api/products/:id", productController.update);
}

//now we need to connect the routes to our app
//the app is coming from server.js so we will require this file in there and be passed back the app and then it will have all the routes on the app