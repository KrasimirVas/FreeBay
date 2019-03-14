const passport = require('passport');
const express = require('express');

const router = new express.Router();

router.post('/login', (req, res, next) => {
    console.log(req.body)

    return passport.authenticate('local-login', (err, token) => {
        if (err) {
            if (err.name === 'IncorrectCredentialsError') {
                return res.status(200).json({
                    error: err.message
                });
            }

            return res.status(200).json({
                error: 'Couldnt process form.'
            });
        }

        return res.json({
            message: 'You have successfully logged in!',
            token   
        });
    })(req, res, next)
});

router.post('/register', (req, res, next) => {
    let user = req.body;

    if (user.password && user.password !== user.confirmPassword) {
        return res.status(200).json({
            error: 'Passwords do not match!'
        });
    }

    return passport.authenticate('local-register', (err) => {
        if (err) {
            return res.status(200).json({
                error: err
            });
        }

        return res.status(200).json({
            message: 'You have successfully signed up! Now you should be able to log in.'
        });
    })(req, res, next);
});

module.exports = router;