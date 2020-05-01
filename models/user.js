const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');

const UserSchema = new mongoose.Schema({
        email: {
            type: String,
            lowercase: true,
            trim: true,
            index: true,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true,
            bcrypt: true
        }
    }, {collection: 'user'}
)

UserSchema.plugin(bcrypt);
UserSchema.index({ email: 1 });

module.exports = mongoose.model('User', UserSchema);
