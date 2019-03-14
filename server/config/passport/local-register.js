const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');
const encryption = require('../../utilities/encryption');

module.exports = new PassportLocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, username, password, done) => {
    console.log(username)
    let user = {
        username: username.trim(),
        password: password.trim()
    }

    console.log('register ' + user)
    User.findOne({
            username: user.username
        })
        .then(u => {
            if (!u) {
                let salt = encryption.generateSalt();
                user.salt = salt;

                if (user.password) {
                    let hashedPassword = encryption.generateHashedPassword(salt, user.password);
                    user.password = hashedPassword;
                }

                User.create(user)
                    .then(() => {
                        return done(null);
                    })
                    .catch(console.log());
            } else {
                return done('Username already exists!');
            }
        });
});