const express = require('express')
const router = new express.Router();
const User = require('../models/User');

const JWT = require('../utilities/verifyToken');

router.get('/', JWT, (req, res) => {
    let userId = req.user.userId;

    User.findById(userId)
        .populate('posts')
        .then(user => {
            res.status(200).json({
                user
            });
        });
});

module.exports = router;