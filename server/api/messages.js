const express = require('express')
const router = new express.Router();

const Message = require('../models/Message');
const User = require('../models/User');

const JWT = require('../utilities/verifyToken');

router.post('/create', JWT, (req, res, next) => {
    let userId = req.user.userId
    let message = req.body;
    message.author = userId;

    if (message.author === message.recipient) {
        return res.status(403).json({
            error: "Cannot send message to yourself"
        });
    } else if (message.message.length < 10) {
        return res.status(403).json({
            error: "Message must be at least 10 symbols long"
        })
    }

    Message.create(message)
        .then((createdMsg) => {
            User.findById(userId)
                .then(user => {
                    user.messages.push(createdMsg._id);
                    user.save();

                    return res.status(201).json({
                        message: 'Message sent successfuly!'
                    });
                });
        }).catch(err => res.status(400).json({
            error: err
        }));
});



router.get('/all', JWT, (req, res, next) => {
    let userId = req.user.userId;

    Message.find({
            $or: [{
                    author: userId
                },
                {
                    recipient: userId
                }
            ]
        })
        .sort('-creationDate')
        .populate('recipient')
        .populate('author')
        .then(messages => {
            return res.status(201).json({
                messages
            });
        })
        .catch(err => res.status(400).json({
            error: err
        }))
});

router.post('/read', JWT, (req, res) => {
    let messageId = req.body.id;

    Message.findById(messageId)
        .then(message => {
            if (message.isRead) {
                res.status(200).json({
                    error: 'This messages is already markad as read'
                });

                return;
            }

            message.isRead = true;
            message.save();

            res.status(200).json({
                message: 'Message is marked as read'
            });
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
})

module.exports = router;