const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    isPaid: Boolean,
    expirationDate: Date,
    authorId: { type: Schema.Types.ObjectId, ref: 'Author' },
    level: String,
    autoRefresh: Boolean,
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
