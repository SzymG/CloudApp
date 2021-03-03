const express = require('express');
const app = express();

const atpRoutes = require('./api/routes/atp');

app.use('/', atpRoutes);

app.use('/success', (req, res, next) => {
    console.log('We get a callback success!');
    res.send('success');
});

module.exports = app;