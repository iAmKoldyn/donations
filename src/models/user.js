const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
        _externalId: { type: mongoose.Types.ObjectId, default: new mongoose.Types.ObjectId() },
    name: String,
    hashPassword: String,
    },
    {
        methods: {
            serialized() {
                return {
                    id: this._externalId,
                    name: this.name,
                }
            }
        },
        statics: {
            requiredParams() {
                return [
                    'name',
                    'password'
                ]
            }
        }
});

module.exports = mongoose.model('User', UserSchema);
