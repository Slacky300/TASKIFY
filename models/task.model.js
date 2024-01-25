const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        trim: true
    },

    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },

    completed: {
        type: Boolean,
        default: false
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

}, {timestamps: true});

module.exports = mongoose.model('Task', TaskSchema);