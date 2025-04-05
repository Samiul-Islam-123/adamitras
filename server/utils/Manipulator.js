const ConnectToDatabase = require('../config/dbConfig');
const dotenv = require('dotenv');
const Logger = require('./Logger');
const EventModel = require('../models/EventModel');

const logger = new Logger();

async function main() {
    await ConnectToDatabase(`mongodb+srv://isamiul099:qi5M3a1fEcb9Aa5V@cluster0.gfeuy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

    logger.info("Updating current status...");
    try {
        const liveTitles = [
            "Path follower",
            "Coding premiere league",
            "Circuitronix",
            "Lathe war",
            "Bgmi",
            "Pes",
            "Treasure hunt"
        ];

        // Create case-insensitive regex patterns for each title
        const regexPatterns = liveTitles.map(title => new RegExp(`^${title}$`, 'i'));

        // Set currentStatus = "Live" for matching titles (case-insensitive)
        await EventModel.updateMany(
            { title: { $in: regexPatterns } },
            { $set: { currentStatus: "Live" } }
        );

        // Set currentStatus = "" for all other events
        await EventModel.updateMany(
            { title: { $nin: regexPatterns } },
            { $set: { currentStatus: "" } }
        );

        logger.info("Current status updated successfully.");
    } catch (error) {
        logger.error(error.message);
    } finally {
        // Close the database connection when done
        process.exit(0);
    }
}

(async () => {
    await main();
})();