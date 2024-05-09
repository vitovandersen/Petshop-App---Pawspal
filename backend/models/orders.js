const mongoose = require('mongoose');

// Mongoose Schema Orders collection
const ordersSchema = mongoose.Schema({
    user_id: String,
    order_date: String,
    total_price: Number,
    payment_method: String,
    payment_status: String
})

// Export Object Model Orders ke App.js
exports.Orders = mongoose.model('Orders', ordersSchema);
