const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },

    tasks_created: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],

}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);