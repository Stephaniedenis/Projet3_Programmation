const mongoose = require('mongoose');

// Schema
const productSchema = mongoose.Schema({
    code : String,
    description: String,
    price : Number
});

//exporter le schema
module.exports = mongoose.model('product', productSchema);