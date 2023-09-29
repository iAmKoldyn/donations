const mongoose = require('mongoose');
const {Schema} = mongoose;

const authorSchema = new Schema({
        _externalId: mongoose.Types.ObjectId,
        name: String,
        hashPassword: String,
        tags: [String],
        subscriptionLevels: [String],
    },
    {
        methods: {
            serialized() {
                return {
                    id: this._externalId,
                    name: this.name,
                    tags: this.tags,
                    subscriptionLevels: this.subscriptionLevels
                }
            }
        },
        statics: {
            requiredParams() {
                return [
                    'name',
                    'tags',
                    'subscriptionLevels'
                ]
            }
        }
    });

module.exports = mongoose.model('Author', authorSchema);
