const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    picture: {
        type: String,
    },
    role : {
        type: String,
        default: 'basic',
        enum: ["basic", "supervisor", "admin"],
    },
    accessToken: {
        type: String,
    },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
