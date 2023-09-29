const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
        _externalId: mongoose.Types.ObjectId,
        postId: {type: Schema.Types.ObjectId, ref: 'Post'},
        userId: {type: Schema.Types.ObjectId, ref: 'User'},
        content: String,
        date: {type: Date, default: Date.now},
    },
    {
        methods: {
            serialized() {
                return {
                    id: this._externalId,
                    postId: this.postId,
                    userId: this.userId,
                    content: this.content,
                    date: this.date,
                }
            }
        }
    });

module.exports = mongoose.model('Comment', commentSchema);
