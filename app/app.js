const express = require('express');
const helmet = require('helmet');
const expressLogger = require('./middleware/expressLogger');
const routes = require('./routes/index');

const app = express();

app.use(helmet());
app.use(expressLogger);
app.use(routes);

module.exports = app;
