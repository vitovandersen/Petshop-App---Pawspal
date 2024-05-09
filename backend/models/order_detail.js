const mongoose = require('mongoose');

// Mongoose Schema Order Detail collection
const orderDetailSchema = mongoose.Schema({
    order_id: String,
    product_id: String,
    quantity: Number,
    total_price: Number
})

// Export Object Model OrderDetail ke App.js
exports.OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);
