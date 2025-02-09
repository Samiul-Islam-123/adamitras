const mongoose = require('mongoose');
const Logger = require('../utils/Logger');

const logger = new Logger();

const ConnectToDatabase = async (URL) => {
    try {
        logger.info('Connecting to MongoDB...');
        await mongoose.connect(URL);
        logger.info("Successfully connected with mongoDB");

    }
    catch(error){
        logger.error(error)
    }
}

module.exports = ConnectToDatabase