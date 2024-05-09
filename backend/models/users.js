const mongoose = require('mongoose');

// Mongoose Schema Users collection
const usersSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    address: String,
    profile_picture: String,
    roleAdmin: Boolean,
})

usersSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

usersSchema.set('toJSON', {
    virtuals: true,
});

// Export Object Model Users ke App.js
exports.Users = mongoose.model('Users', usersSchema);
exports.usersSchema = usersSchema;