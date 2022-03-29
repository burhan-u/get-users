const express = require('express');
const expressLogger = require('./middleware/expressLogger');

const app = express();

app.use(expressLogger);

app.get('/users', (req, res) => {
  res.status(200).json();
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = app;
