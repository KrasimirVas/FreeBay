const express = require('express')
const router = new express.Router();

const Post = require('../models/Post');
const User = require('../models/User');
const Category = require('../models/Category');

const JWT = require('../utilities/verifyToken');

router.get('/allusers', JWT, (req, res, next) => {
    let userId = req.user.userId;

    User.findById(userId)
        .then(u => {
            if (!isAdmin(u)) {
                res.status(403).json({
                    error: 'You dont have permissions'
                });

                return;
            }

            User.find()
                .then(users => {
                    res.status(200).json({
                        users
                    });
                })
                .catch(err => {
                    res.status(200).json({
                        error: err
                    });
                })
        })
        .catch(err => {
            res.status(200).json({
                error: err
            });
        });
});

router.get('/allposts', JWT, (req, res, next) => {
    let userId = req.user.userId;

    User.findById(userId)
        .then(u => {
            if (!isAdmin(u)) {
                res.status(403).json({
                    error: 'You dont have permissions'
                });

                return;
            }

            Post.find()
                .populate('category')
                .populate('author')
                .then(posts => {
                    res.status(200).json({
                        posts
                    });
                })
                .catch(err => {
                    res.status(200).json({
                        error: err
                    });
                })
        })
        .catch(err => {
            res.status(200).json({
                error: err
            });
        });
});

router.post('/user/changestatus', JWT, (req, res, next) => {
    let adminId = req.user.userId;
    let userToDisableEnable = req.body.userId;

    if(adminId === userToDisableEnable) {
        res.status(403).json({
            error: 'You dont have permissions'
        });

        return;
    }
    User.findById(adminId)
        .then(u => {
            if (!isAdmin(u)) {
                res.status(403).json({
                    error: 'You dont have permissions'
                });

                return;
            }

            User.findById(userToDisableEnable)
                .then(userToModify => {
                    if (userToModify.isDisabled) {
                        userToModify.isDisabled = false;
                    } else {
                        userToModify.isDisabled = true;
                    }

                    userToModify.save();


                    res.status(200).json({
                        message: `${userToModify.username} status is modified`
                    });
                })
                .catch(err => {
                    res.status(200).json({
                        error: err
                    });
                })
        })
        .catch(err => {
            res.status(200).json({
                error: err
            });
        });
});

router.get('/categories', JWT, (req, res, next) => {
    let userId = req.user.userId;

    User.findById(userId)
        .then(u => {
            if (!isAdmin(u)) {
                res.status(403).json({
                    error: 'You dont have permissions'
                });

                return;
            }

            Category.find()
                .populate('posts')
                .then(categories => {
                    res.status(200).json({
                        categories
                    });
                })
                .catch(err => {
                    res.status(200).json({
                        error: err
                    });
                })
        })
        .catch(err => {
            res.status(200).json({
                error: err
            });
        });
});

function isAdmin(user) {
    return user.roles.indexOf('Admin') >= 0;
}

module.exports = router;