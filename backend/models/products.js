const mongoose = require('mongoose');

// Mongoose Schema Products collection
const productsSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    stock: Number
})

// Export Object Model product ke App.js
exports.Product = mongoose.model('Product', productsSchema);
