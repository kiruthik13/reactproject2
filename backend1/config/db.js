import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://kiruthikbairavan13:kiruthik13@cluster0.n8x1r2g.mongodb.net/react1');
        console.log('MongoDB connected successfully to react1');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
    }
}

// Call connectDB if this file is run directly
connectDB();