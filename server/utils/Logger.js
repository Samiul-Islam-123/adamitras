class Logger {
    info(data) {
        let timestamp = new Date().toISOString();
        console.log(`\x1b[92m[INFO][${timestamp}] : ${data}\x1b[0m`); // Light green text
    }

    error(data) {
        let timestamp = new Date().toISOString();
        console.error(`\x1b[31m[ERROR][${timestamp}] : ${data}\x1b[0m`); // Red text
    }

    warn(data) {
        let timestamp = new Date().toISOString();
        console.warn(`\x1b[33m[WARN][${timestamp}] : ${data}\x1b[0m`); // Yellow text
    }
}

module.exports = Logger;
