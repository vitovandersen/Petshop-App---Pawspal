const mongoose = require('mongoose');

// Mongoose Schema Services collection
const servicesSchema = mongoose.Schema({
    user_id: String,
    service_name: String,
    description: String
})

// Export Object Model Services ke App.js
exports.Services = mongoose.model('Services', servicesSchema);
