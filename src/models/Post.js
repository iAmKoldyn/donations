const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    authorId: { type: Schema.Types.ObjectId, ref: 'Author' },
    content: String,
    attachment: String,
    visibilityLevel: String,
    viewsCount: Number,
    date: Date,
});

module.exports = mongoose.model('Post', PostSchema);
