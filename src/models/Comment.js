const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    date: Date,
});

module.exports = mongoose.model('Comment', CommentSchema);
