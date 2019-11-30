'use strict';
const {loggers, format, transports} = require('winston');
loggers.add('my-logger', {
    level: 'debug',
    format: format.combine(
        format.colorize(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.File({
            level: 'info',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false

});
const logger = loggers.get('my-logger');
logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing

require('./data/connection');
const routes = require('./routes');

app.use(require("morgan")("combined", {stream: logger.stream}));

app.use('/', routes);
const server = app.listen(process.env.PORT);
logger.info(`Server started at ${server.address().port}`);
