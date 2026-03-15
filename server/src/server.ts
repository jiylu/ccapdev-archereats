import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import app from "./index.js";
import connectDB from "config/db.js";
import { logger } from 'utils/logger.js';

const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB()

        app.listen(PORT, () => {
            logger.info(`Server running at http://localhost:${PORT}`)
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error("Failed to start server: ", error.message)
        } else {
            logger.error("Failed to start server: ", error)
        }

        process.exit(1)
    }
}

start()