'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const password = require('passport');
const User = require('./model/user');
const localStartegy = require("passport-local"). Strategy;
const methodOverride = require('method-override');
const path = require('path');
const userRoutes = require('./routes/users');

dotenv.config({path: './config.env'});

let databaseURL = process.env.DATABASE_LOCAL || "mongodb://localhost:27017/usersdb";

mongoose.connect(databaseURL, {useNewUrlParser: true});

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method')); 

app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static('public'));
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
app.use(
    session({
        secret: "secret_passcode",
        cookie: {
            maxAge:4000000
        },
        resave: false,
        saveUninitialized: false
    })
);

app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
res.locals.flashMessages = req.flash();
next();
});

app.use(userRoutes);

const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`Server running at http://localhost:${ port }`);
});

