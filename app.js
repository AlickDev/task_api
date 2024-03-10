const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { readdirSync } = require('fs');
const cors = require('cors');
const helmet = require('helmet')
const bodyParser = require('body-parser');


var app = express();
app.use(cors());
app.use(helmet());

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

readdirSync('./routes').map((file) => {
    app.use('/v1/api', require('./routes/version_v1' + file));
});

module.exports = app;
