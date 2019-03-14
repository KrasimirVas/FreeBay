const config = require('./config/config');
const db = require('./config/database');
const express = require('express');

let app = express();
let environment = process.env.NODE_ENV || 'development';

db(config[environment]);
require('./config/server')(app, config[environment]);
require('./config/routes')(app);

app.listen(config.port, () => {
    console.log('Server started.');
    console.log(`Listening on port ${config.port}...`);
});