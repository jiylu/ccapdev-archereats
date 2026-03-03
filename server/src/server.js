import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from "./config/database.js";
import routes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

const start = async () => {
    try {
        console.log("Connecting to DB")
        await connectDB();
        console.log("MongoDB Connection Established.")

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
}

start();