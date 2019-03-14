const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../../models/User');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, username, password, done) => {
    let user = {
        username: username.trim(),
        password: password.trim()
    }

    console.log(user);

    User.findOne({
            username: user.username
        })
        .then(u => {
            if (!u || !u.authenticate(user.password)) {
                let error = new Error('Incorect username or password');
                error.name = 'IncorrectCredentialsError';

                return done(error);
            } else if (u.isDisabled) {
                let error = new Error('This user is temporaly disabled!');
                error.name = 'IncorrectCredentialsError';

                return done(error);
            } else {
                const payload = {
                    userId: u.id,
                    username: u.username,
                    isAdmin: u.roles.indexOf('Admin') > -1
                };

                const token = jwt.sign(payload, config.secret, {
                    expiresIn: 86400
                });

                return done(null, token);
            }
        });
});