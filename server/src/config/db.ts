import mongoose from 'mongoose';
import { logger } from 'utils/logger.js';

const connectDB = async () => {
    logger.info("Connecting to MongoDB")
    
    if (!process.env.DB_URL) {
        logger.error("DB_URL is not defined.")
        throw new Error("DB_URL is not defined.");
    }
    
    try {
        await mongoose.connect(process.env.DB_URL);
        logger.info("Connected to MongoDB.")
    } catch (error) {
        logger.error("Error: ", error)
        process.exit(1);
    }
}

export default connectDB;