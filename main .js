const express = require("express");
const app =  express();
const mongoose = require('mongoose');
const homeController = require("/routes/homeController");
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path : './config.env'});<

mongoose.connect(process.env.DATABASE_LOCAL, {userNewUrlParser: true});
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.set("views engine", "ejs");
//Routes
app.get("/", homeController.getIndex);
app.get('/edit', homeController.getEdit);




const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Le serveur démarre sur le http://localhost:${port}`);
});











//const port = process.env.PORT;
app.set("port",process.env.PORT || 4000);

app.listen(app.get("port"),()=>{
    console.log(`Server running at http://localhost:${app.get("port")}`)
});

