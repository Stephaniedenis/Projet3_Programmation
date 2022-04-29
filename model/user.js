const mongoose = require('mongoose');
passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    }
});
userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});
userSchema.methods.getInfo = function(){
    return `Name: ${this.name} Email: ${this.email} Password: ${this.password}`
};


module.exports = mongoose.model("User", userSchema);