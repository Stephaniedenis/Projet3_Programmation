const express = require("express");
const app =  express();
const homeController = require("/routes/homeController");
const dotenv = require('dotenv');
dotenv.config({path : '/config.env'});

app.set("views engine", "ejs");
//Routes
app.get("/", homeController.getIndex);
app.get('/edit', homeController.getEdit);











//const port = process.env.PORT;
app.set("port",process.env.PORT || 4000);

app.listen(app.get("port"),()=>{
    console.log(`Server running at http://localhost:${app.get("port")}`)
});

