const { loggers } = require('winston')
const logger = loggers.get('my-logger');

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const mongo_config_params = {useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(process.env.MONGO_URL, mongo_config_params)
    .then(result =>{logger.info("Mongo connected!")})
    .catch(error => logger.error("Error in mongo connection", error));

module.exports = mongoose;
