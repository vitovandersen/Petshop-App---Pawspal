const mongoose = require('mongoose');

// Mongoose Schema CartItems collection
const cartItemSchema = mongoose.Schema({
    user_id: String,
    product_id: String,
    service_id: String,
    quantity: Number
})

// Export Object Model CartItems ke App.js
exports.CartItems = mongoose.model('CartItems', cartItemSchema);
