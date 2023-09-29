const mongoose = require('mongoose');
const { Schema } = mongoose;

const DonationSchema = new Schema({
    _externalId: Schema.Types.BigInt,
    sum: Number,
    comment: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    authorId: { type: Schema.Types.ObjectId, ref: 'Author' },
    date: Date,
});

module.exports = mongoose.model('Donation', DonationSchema);
