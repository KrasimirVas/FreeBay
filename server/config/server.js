const passport = require('passport');
const cors = require('cors')
const bodyParser = require('body-parser');
const localSignupStrategy = require('./passport/local-register');
const localLoginStrategy = require('./passport/local-login');
const fileUpload = require('express-fileupload');

module.exports = (app, config) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(cors());
    app.use(fileUpload());

    passport.use('local-register', localSignupStrategy);
    passport.use('local-login', localLoginStrategy);
};