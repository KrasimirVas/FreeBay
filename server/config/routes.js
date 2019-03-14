const routes = require('../api');

module.exports = (app) => {
    app.use('/', routes.posts);
    app.use('/auth', routes.auth);
    app.use('/categories', routes.categories);
    app.use('/messages', routes.messages);
    app.use('/admin', routes.admin);
    app.use('/user', routes.users);
};