import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import app from "./index.js";
import connectDB from "config/db.js";

const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        console.log("Connecting to DB")
        await connectDB()
        console.log("MongoDB Connection Established.")

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`)
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Failed to start server:", error.message)
        } else {
            console.error("Failed to start server: ", error)
        }

        process.exit(1)
    }
}

start()