const mongoose = require('mongoose');

// Mongoose Schema Payments collection
const paymentsSchema = mongoose.Schema({
    order_id: String,
    amount: Number,
    payment_date: String,
    payment_status: String,
    payment_method: String
})

// Export Object Model Payments ke App.js
exports.Payments = mongoose.model('Payments', paymentsSchema);
