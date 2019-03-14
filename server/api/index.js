const authAPI = require('./auth');
const postsAPI = require('./posts');
const categoriesAPI = require('./cateogries');
const messagesAPI = require('./messages');
const adminAPI = require('./admin');
const userAPI = require('./user');

module.exports = {
    auth: authAPI,
    posts: postsAPI,
    categories: categoriesAPI,
    messages: messagesAPI,
    admin: adminAPI,
    users: userAPI
};