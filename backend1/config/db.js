import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/react1');
        console.log('MongoDB connected successfully to react1');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
    }
}

// Call connectDB if this file is run directly
connectDB();