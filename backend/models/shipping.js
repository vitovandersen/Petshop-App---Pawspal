const mongoose = require('mongoose');

// Mongoose Schema Shipping collection
const shippingSchema = mongoose.Schema({
    order_id: String,
    shipping_method: String,
    shipping_status: String,
    shipping_cost: String,
    delivery_date: String
})

// Export Object Model Shipping ke App.js
exports.Shipping = mongoose.model('Shipping', shippingSchema);
