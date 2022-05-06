const User = require('../model/user');
const passport = require("passport");


module.exports={

authenticate : passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash : {type: "error_msg", message: ""},
    successRedirect : "/",
    successFlash: {type: "success_msg", message: ""}
}),

ensureAuthenticated : (req,res,next) => {
    if(req.isAuthenticated()) {
    return next();
    }
    // req.flash('error_msg' , 'please login to view this resource');
    res.redirect('/login');
},

validate : (req,res,next) => {
    req.sanitizeBody("email").normalizeEmail({all_lowercase : true}).trim();
    req.check().isEmail();
    req.check("password").notEmpty();
    req.getValidationResult().then(result=>{
        if (!result.isEmpty()) {
            req.skip = true;
            res.locals.redirect = "users/new";
            next();
        }
        else
        {
            next();
        }
    })
    .catch(error => {
        next(error);
    });
},

logout : (req,res,next) => {
    if(req.isAuthenticated()) {
        req.logout();
    }
    next();
},

}



