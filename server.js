var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

//variables
var PORT = process.env.PORT || 8080;
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
//use the body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
//use handlebars as the rendering engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
//set handlebars as the view engine
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/main_controller.js");
app.use("/", routes);
app.get("*", function(req, res){
    res.redirect("/");
});

app.listen(PORT, function(){
    console.log("Server listening on port " + PORT);
});