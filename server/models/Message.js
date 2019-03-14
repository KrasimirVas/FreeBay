const mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
    message: {
        type: mongoose.SchemaTypes.String,
        minlength: 10,
        require: true
    },
    isRead: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : 'User'
    },
    recipient: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    creationDate: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now
    }
});

let Message = mongoose.model('Message', messageSchema);

module.exports = Message;