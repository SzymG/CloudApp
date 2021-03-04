const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const atpRoutes = require('./api/routes/atp');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', atpRoutes);

module.exports = app;