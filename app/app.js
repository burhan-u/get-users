const express = require('express');
const expressLogger = require('./middleware/expressLogger');
const usersRoute = require('./routes/users');
const notFound = require('./routes/notFound');

const app = express();

app.use(expressLogger);

app.use('/users', usersRoute);
app.use(notFound);

module.exports = app;
