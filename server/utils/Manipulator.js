const ConnectToDatabase = require('../config/dbConfig');
const dotenv = require('dotenv');
const Logger = require('./Logger');
const EventModel = require('../models/EventModel')

const logger = new Logger();

async function main() {
    await ConnectToDatabase(`mongodb+srv://isamiul099:qi5M3a1fEcb9Aa5V@cluster0.gfeuy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

    logger.info("Updating current status...");
    try {
        await EventModel.updateMany({}, { $set: { currentStatus: "Live" } });
        logger.info("Done, all events are now marked as Live");
    } catch (error) {
        logger.error(error.message);
    }

}

(async () => {
    await main();
})();