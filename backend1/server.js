import express from 'express';
import { connectDB } from './config/db.js';
import User from './model/user.js';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Basic CRUD operations for users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
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
});