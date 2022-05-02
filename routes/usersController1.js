const User = require('../model/user');
const passport = require("passport");
const validate = require('express-validator');

module.exports={

authenticate : passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash : {type: "error_msg", message: ""},
    successRedirect : "/",
    successFlash: {type: "success_msg", message: ""}
}),
validate : (req,res, next)=>{
    req.sanitizeBody("email").normalizeEmail({
        all_lowercase: true}).trim();
        req.check("email","Email is invalid").isEmail();
        req.check("password","Password cannot be empty").notEmpty();
        req.getValidationResult().then((error)=>{
            if(!error.isEmpty()){
                render.skip= true;
                res.locals.redirect = "/users/new";
                next();
            }
        });
    }
}


