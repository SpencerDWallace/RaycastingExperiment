var express = require("express");
var routes = require("./routes");
var path = require("path");


var app = express();

app.set("port", process.env.PORT || 8002);
app.set("views", path.join(__dirname, "/views"));
app.engine('html', require('ejs').renderFile);
app.set("view engine", "ejs");


app.use(routes);


app.listen(app.get("port"),function(){
    console.log("Server started on port " + app.get("port"));
})