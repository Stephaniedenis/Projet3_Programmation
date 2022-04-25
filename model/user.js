const mongoose = require('mongoose');

// Schema
const userSchema = mongoose.Schema({
    code : String,
    description: String,
    price : Number
});

//exporter le schema
module.exports = mongoose.model('user', userSchema);