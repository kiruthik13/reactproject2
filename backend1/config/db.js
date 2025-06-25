import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://kiruthikbairavan13:kiruthik13@cluster0.n8x1r2g.mongodb.net/react1';
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully to react1');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
    }
}

// Call connectDB if this file is run directly
connectDB();