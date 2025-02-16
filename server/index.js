const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Logger = require('./utils/Logger');
const ConnectToDatabase = require('./config/dbConfig');

const getIPAddress = require('./utils/IP');
const AuthRouter = require('./routes/AuthRouter');
const APIRouter = require('./routes/API');
const DriveRouter = require('./routes/DriveRouter');

const app = express();
const PORT = process.env.PORT || 5500;

const logger = new Logger();

app.use(express.json());
app.use(cors());

dotenv.config();

app.get('/', (req,res) => {
    res.json({
        message : "Hellow :)",
        success : true
    })
})

app.use('/auth', AuthRouter);
app.use('/api', APIRouter)
app.use('/drive', DriveRouter)

app.listen(PORT,async () => {
    logger.info("Server is starting...");
    if(process.env.MONGODB_URL)
    await ConnectToDatabase(process.env.MONGODB_URL);
    else
    logger.error(`DATABASE URL not found...please recheck environment variables...`);
    const SERVERURL = getIPAddress();
    logger.info(`Server is up and running at : http://${SERVERURL}:${PORT}`)  
})