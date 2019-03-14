const express = require('express')
const router = new express.Router();


const JWT = require('../utilities/verifyToken');

const Category = require('../models/Category');
const User = require('../models/User');

router.get('/all', (req, res, next) => {
    Category.find()
        .sort({
            title: 1
        })
        .then(categories => {
            return res.status(200).json({
                categories
            });
        })
        .catch(console.log());
});

router.post('/create', JWT, (req, res, next) => {
    let userId = req.user.userId;
    let body = req.body;

    User.findById(userId)
        .then(u => {
            if (u.roles.indexOf('Admin') < 0) {
                res.status(403).json({
                    error: 'You dont have permissions'
                });

                return;
            }

            Category.create(body)
                .then(category => {
                    return res.status(201).json({
                        category
                    });
                })
                .catch(console.log());
        })
        .catch(console.log());
});

router.get('/edit', JWT, (req, res, next) => {
    let userId = req.user.userId;
    let categoryId = req.query.id;

    User.findById(userId)
        .then(u => {
            if (u.roles.indexOf('Admin') < 0) {
                res.status(403).json({
                    error: 'You dont have permissions'
                });

                return;
            }

            Category.findById(categoryId)
                .then(category => {
                    return res.status(200).json({
                        category
                    });
                })
                .catch(console.log());
        })
        .catch(console.log());
});

router.post('/edit', JWT, (req, res, next) => {
    let userId = req.user.userId;
    let body = req.body;

    User.findById(userId)
        .then(u => {
            if (u.roles.indexOf('Admin') < 0) {
                res.status(403).json({
                    error: 'You dont have permissions'
                });

                return;
            }

            Category.findById(body.id)
                .then(category => {

                    category.title = body.title;
                    category.save();

                    return res.status(200).json({
                        message: "Category title changed"
                    });
                })
                .catch(console.log());
        })
        .catch(console.log());
});

module.exports = router;