const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');
const proppertyIsRequred = `{0} is required.`;

let userSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: proppertyIsRequred.replace('{0}', 'Username'),
        unique: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: proppertyIsRequred.replace('{0}', 'Password')
    },
    salt: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    roles: [{
        type: mongoose.SchemaTypes.String
    }],
    posts: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post'
    }],
    messages:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref: 'Message'
    }],
    favourites: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post'
    }],
    isDisabled:{
        type: mongoose.SchemaTypes.Boolean,
        default: false
    }
});

userSchema.method({
    authenticate: function (password) {
        let hashedPassword = encryption.generateHashedPassword(this.salt, password);

        if (hashedPassword === this.password) {
            return true;
        }

        return false;
    }
});

let User = mongoose.model('User', userSchema);

module.exports = User;

module.exports.seedAdminUser = () => {
    User.find({
        username: 'admin'
    }).then(users => {
        if (users.length === 0) {
            let salt = encryption.generateSalt();
            let hashedPassword = encryption.generateHashedPassword(salt, 'admin123');

            User.create({
                username: 'admin',
                password: hashedPassword,
                salt: salt,
                roles: ['Admin']
            });
        }
    });
};