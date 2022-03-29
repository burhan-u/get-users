const express = require('express');
const helmet = require('helmet');
const healthcheck = require('express-healthcheck');
const expressLogger = require('./middleware/expressLogger');
const usersRoute = require('./routes/users');
const notFound = require('./routes/notFound');

const app = express();

app.use(helmet());
app.use(expressLogger);

app.use('/healthcheck', healthcheck());
app.use('/users', usersRoute);
app.use(notFound);

module.exports = app;
