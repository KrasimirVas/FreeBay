const express = require('express')
const router = new express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Category = require('../models/Category');

const JWT = require('../utilities/verifyToken');


router.get('/', (req, res, next) => {
    Post.find()
        .where('isActive')
        .equals(true)
        .sort('-creationDate')
        .limit(4)
        .then(posts => {
            return res.status(200).json({
                posts
            });
        })
        .catch(console.log());
});
router.get('/all', (req, res, next) => {
    Post.find()
        .where('isActive')
        .equals(true)
        .then(posts => {
            return res.status(200).json({
                posts
            });
        })
        .catch(console.log());
});

router.post('/post/create', JWT, (req, res, next) => {
    let userId = req.user.userId;
    let post = req.body;
    post.author = userId;

    Post.create(post)
        .then(createdPost => {
            User.findById(userId)
                .then(user => {
                    user.posts.push(createdPost._id);
                    user.save();

                    Category.findById(post.category)
                        .then(cat => {
                            cat.posts.push(createdPost._id);
                            cat.save();

                            return res.status(201).json({
                                message: 'You successfully created an post',
                                createdPost
                            });
                        })
                        .catch(console.log());
                })
                .catch(console.log());
        })
        .catch(console.log());
});

router.post('/post/edit', JWT, (req, res) => {
    let userId = req.user.userId;
    let postToUpdate = req.body;

    Post.findById(postToUpdate.id)
        .then(post => {
            User.findById(userId)
                .then(user => {
                    let isAdmin = user.roles.indexOf('Admin') > 0;
                    let isAuthor = user.posts.indexOf(post.id) >= 0;

                    if (!isAdmin && !isAuthor) {
                        return res.status(401).json({
                            error: 'You dont have permissions to edit this post'
                        });
                    }

                    if (post.category !== postToUpdate.category) {
                        Category.findById(post.category)
                            .then(category => {
                                let indexOfPost = category.posts.indexOf(post._id);

                                if (indexOfPost < 0) {
                                    res.status(400).json({
                                        message: 'Category problem'
                                    });

                                    return;
                                }
                                category.posts.splice(indexOfPost, 1);
                                category.save();


                                Category.findById(postToUpdate.category)
                                    .then(newCategory => {
                                        newCategory.posts.push(post._id);
                                        newCategory.save();

                                        post.title = postToUpdate.title;
                                        post.description = postToUpdate.description;                                        
                                        post.category = postToUpdate.category;
                                        post.image = postToUpdate.image;

                                        post.save();

                                        res.status(200).json({
                                            message: 'Post has been updated'
                                        });
                                    });
                            });
                    } else {
                        post.title = postToUpdate.title;
                        post.description = postToUpdate.description;                        
                        post.category = postToUpdate.category;
                        post.image = postToUpdate.image;

                        post.save();

                        res.status(200).json({
                            message: 'Post has been updated'
                        });
                    }
                });
        })
        .catch(console.log());
});

router.get('/post/edit', JWT, (req, res) => {
    let userId = req.user.userId;
    let postId = req.query.id;

    Post.findById(postId)
        .then(post => {
            User.findById(userId)
                .then(user => {
                    let isAdmin = user.roles.indexOf('Admin') > 0;
                    let isAuthor = user.posts.indexOf(post.id) >= 0;

                    if (!isAdmin && !isAuthor) {
                        return res.status(401).json({
                            error: 'You dont have permissions to edit this post'
                        });
                    }

                    res.status(200).json({
                        post
                    });
                });
        })
        .catch(console.log());
})

router.post('/post/delete', JWT, (req, res) => {
    let userId = req.user.userId;
    let postId = req.body.postId;

    User.findById(userId)
        .then(user => {
            if (user.roles.indexOf('Admin') < 0) {
                return res.status(401).json({
                    error: 'You dont have permissions to delete'
                });
            }

            Post.findByIdAndRemove(postId)
                .then(post => {
                    let postAuthor = post.author;

                    Category.findById(post.category)
                        .then(category => {
                            let postIndex = category.posts.indexOf(post._id);

                            category.posts.splice(postIndex, 1);
                            category.save();
                            User.findById(postAuthor)
                                .then(user => {
                                    let postIndex = user.posts.indexOf(post._id);

                                    if (postIndex < 0) {
                                        return res.status(400).json({
                                            error: 'Post have no author'
                                        });
                                    }

                                    user.posts.splice(postIndex, 1);
                                    user.save();

                                    res.status(200).json({
                                        message: 'Post was deleted successfuly'
                                    });
                                }).catch(console.log());
                        }).catch(console.log());
                }).catch(console.log())
        }).catch(console.log());
})

router.get('/post/details', (req, res, next) => {
    let postId = req.query.id;

    Post.findById(postId)
        .then(post => {
            res.status(200).json({
                post
            });
        });
})

router.get('/posts/search', (req, res, next) => {
    let searchedTerm = req.query.searchTerm;
    let regex = new RegExp(`.*${searchedTerm}.*`, 'ig');

    Post.find({
            title: regex
        })
        .where('isActive')
        .equals(true)
        .then(posts => {
            res.status(200).json({
                posts
            });
        });
});

router.get('/posts/myposts', JWT, (req, res, next) => {
    let userId = req.user.userId;

    User.findById(userId)
        .populate({
            path: 'posts',
            options: {
                sort: '-creationDate',
                populate: 'category'
            }
        })
        .then(user => {
            res.status(200).json({
                posts: user.posts
            });
        })
        .catch(err => res.status(400).json({
            error: err
        }));
});

router.get('/posts/category', (req, res, next) => {
    let categoryId = req.query.id;

    Category.findById(categoryId)
        .populate({
            path: 'posts',
            options: {
                where: 'isActive',
                equals: true
            }
        })
        .then(category => {
            res.status(200).json({
                category
            });
        })
        .catch(err => res.status(400).json({
            error: err
        }));
});

router.post('/post/changestatus', JWT, (req, res) => {
    let userId = req.user.userId;
    let postId = req.body.postId;

    User.findById(userId)
        .then(user => {
            let isAdmin = user.roles.indexOf('Admin') >= 0;
            let isAuthor = user.posts.indexOf(postId) >= 0;

            if (!isAdmin && !isAuthor) {
                return res.status(401).json({
                    error: 'You dont have permissions to change status'
                });
            }

            Post.findById(postId)
                .then(post => {
                    if (post.isActive) {
                        post.isActive = false;
                    } else {
                        post.isActive = true;
                    }

                    post.save();

                    res.status(200).json({
                        message: 'Post status changed'
                    });
                })
                .catch(err => {
                    res.status(400).json({
                        error: err
                    });
                });
        });
});

module.exports = router;