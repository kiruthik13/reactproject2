import express from 'express';
import { connectDB } from './config/db.js';
import User from './model/user.js';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Enhanced CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*', // Allow all origins for testing
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
    if (process.env.LOG_LEVEL === 'debug') {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
        if (req.method === 'POST' || req.method === 'PUT') {
            console.log('Request Body:', req.body);
        }
    }
    next();
});

connectDB();

// Basic CRUD operations for users
app.get('/api/users', async (req, res) => {
    try {
        console.log('GET /api/users - Fetching all users');
        const users = await User.find();
        console.log(`Found ${users.length} users`);
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        console.log('POST /api/users - Received user data:', req.body);
        
        // Validate required fields
        if (!req.body.name || !req.body.email || !req.body.age) {
            return res.status(400).json({ 
                message: 'Missing required fields: name, email, and age are required' 
            });
        }

        const user = new User(req.body);
        const savedUser = await user.save();
        console.log('User saved successfully:', savedUser);
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Placement training specific endpoints
app.get('/api/skills', (req, res) => {
    const skills = [
        { id: 1, name: 'React', category: 'Frontend', level: 'Intermediate' },
        { id: 2, name: 'Node.js', category: 'Backend', level: 'Advanced' },
        { id: 3, name: 'Express', category: 'Backend', level: 'Intermediate' },
        { id: 4, name: 'MongoDB', category: 'Database', level: 'Beginner' },
        { id: 5, name: 'JavaScript', category: 'Programming', level: 'Advanced' },
        { id: 6, name: 'HTML/CSS', category: 'Frontend', level: 'Intermediate' }
    ];
    res.json(skills);
});

app.get('/api/training-modules', (req, res) => {
    const modules = [
        { id: 1, title: 'React Fundamentals', duration: '2 weeks', difficulty: 'Beginner' },
        { id: 2, title: 'Node.js & Express', duration: '3 weeks', difficulty: 'Intermediate' },
        { id: 3, title: 'Database Design', duration: '2 weeks', difficulty: 'Intermediate' },
        { id: 4, title: 'API Development', duration: '2 weeks', difficulty: 'Advanced' }
    ];
    res.json(modules);
});

app.get('/api/placement-stats', (req, res) => {
    const stats = {
        totalStudents: 150,
        placedStudents: 120,
        averageSalary: 65000,
        topCompanies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple']
    };
    res.json(stats);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});