import mongoose from 'mongoose';

const connectDB = async () => {
    if (!process.env.DB_URL) {
            throw new Error("DB_URL is not defined.");
    }
    
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB.');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectDB;