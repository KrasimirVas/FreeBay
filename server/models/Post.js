const mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    description: {
        type: mongoose.SchemaTypes.String,
        required: true,
        minlength: 20
    },

    location: {
        type: mongoose.SchemaTypes.String
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: mongoose.SchemaTypes.String
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    },
    creationDate: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now
    },
    isActive: {
        type: mongoose.SchemaTypes.Boolean,
        default: true
    }
});

let Post = mongoose.model('Post', postSchema);

module.exports = Post;