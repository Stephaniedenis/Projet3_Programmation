const User = require('../model/user');
const passport = require("passport");


module.exports={

authenticate : passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash : {type: "error_msg", message: ""},
    successRedirect : "/",
    successFlash: {type: "success_msg", message: ""}
}),

}



