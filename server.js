const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing

const mongoose = require('./data/connection');
const  routes = require('./routes');

app.use('/', routes);

app.listen(process.env.PORT, function () {console.log('started')})
