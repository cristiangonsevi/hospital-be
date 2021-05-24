const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const { router } = require('./routes/index');

const { dbConnection } = require('./services/mongodb/config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnection();

app.use('/v1', router);

module.exports = { app };
