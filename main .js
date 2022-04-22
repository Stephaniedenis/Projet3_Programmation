'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");

//const User = require('./model/user');
const methodOverride = require('method-override');
const path = require('path');
const userRoutes = require('./routes/users');
dotenv.config({path: './config.env'});

mongoose.connect(process.env.DATABASE_LOCAL, {useNewUrlParser: true});
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method')); 

app.set('views', path.join(__dirname, 'views'));
app.set(express.static('public'));
app.set("view engine", 'ejs');

app.use(cookieParser("my_secret_code"));
app.use(expressSession({
secret: "my_secret_code",
cookie: {
maxAge: 400000
},
resave: false,
saveUninitialized: false
}));

app.use(connectFlash());

app.use((req, res, next) => {
res.locals.flashMessages = req.flash();
next();
});

app.use(userRoutes);

const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`Server running at http://localhost:${ port }`);
});

