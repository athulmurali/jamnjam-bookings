const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing
app.use('/', ()=>console.log("I am here"));

// const toolsRouter = require('./apis/tools');

// app.use('/tools', toolsRouter);

app.listen(process.env.PORT, function () {console.log('started')})
