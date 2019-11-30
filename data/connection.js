const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const mongo_config_params = {useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(process.env.MONGO_URL, mongo_config_params)
    .then(result =>{console.log("Mongo connected!")})
    .catch(error => console.error("Error in mongo connection", error));

module.exports = mongoose;
