'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const passport = require('passport');
const User = require('./model/user');
const expressValidator = require("express-validator");
const localStartegy = require("passport-local"). Strategy;
const methodOverride = require('method-override');
const path = require('path');
const userRoutes = require('./routes/users');
const morgan = require('morgan');

app.use(morgan(
    function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ');
  })
);

dotenv.config({path: './config.env'});

let databaseURL = process.env.DATABASE_LOCAL || "mongodb://localhost:27017/usersdb";

mongoose.connect(databaseURL, {useNewUrlParser: true});

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('api/users', userRoutes);
app.use(methodOverride('_method')); 

app.use(expressValidator());

app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static('public'));
app.set("view engine", 'ejs');

app.use(cookieParser("secret_passcode"));
app.use(
    session({
        secret: "secret_passcode",
        cookie:{
            maxAge: 4000000
        },
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use(connectFlash());

app.use((req, res, next) => {
res.locals.flashMessages = req.flash();
next();
});

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.use(userRoutes);

const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`Server running at http://localhost:${ port }`);
});

