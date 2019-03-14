const mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        require: true
    },
    posts: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post'
    }],
    faIcon: {
        type:mongoose.SchemaTypes.String
    }
})

let Category = mongoose.model('Category', categorySchema);

module.exports = Category;