const port = 8000;
const cors = require("cors");//allows for access from port 3000 to port 8000
const express = require("express");

//create variable for running a different database in the mongoose.config.js file
const dbName = "product-manager";

//the server.js file needs to have code to execute the other files since it is the only file we run from the command line
//so we need to import them via require
//requiring a file will execute the code in that file, and if the file has an export, that will be exported
//the function from monngoose.config is imported and then immediately executed
require("./config/mongoose.config")(dbName);
//this will be receving the function where we can pass in the dbName variable to

//create our app
const app = express();

//enable cors
app.use(cors());

//able to use JSON and receive JSON, without this - req.body will be undefined (the body / data of  form submission)
app.use(express.json());

//this must be b elow where the app is created
//gives us back the function that's exported so let's execute it so it can attach all of the routes to the app
require("./routes/pm.routes")(app)

//add in listener
app.listen( port, () => {
    console.log(`Listening on port ${port} for REQuests to RESpond to`)
});
