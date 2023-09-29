const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuthorSchema = new Schema({
    name: String,
    hashPassword: String,
    subscriptionLevels: [String],
});

module.exports = mongoose.model('Author', AuthorSchema);
