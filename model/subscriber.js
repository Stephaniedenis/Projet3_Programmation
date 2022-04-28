const mongoose = require('mongoose');
passportLocalMongoose = require("passedport-local-mongoose");
const subscriberSchema = new mongoose.Schema({
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
subscriberSchema.methods.getInfo = function(){
    return `Name: ${this.name} Email: ${this.email} Password: ${this.password}`
};
module.exports = mongoose.model("Subscriber", subscriberSchema);