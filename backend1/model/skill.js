import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    category: { 
        type: String, 
        required: true,
        enum: ['Frontend', 'Backend', 'Database', 'Programming', 'DevOps', 'Design']
    },
    level: { 
        type: String, 
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    },
    description: { type: String },
    duration: { type: String }, // e.g., "2 weeks"
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const Skill = mongoose.model('Skills', SkillSchema);

export default Skill; 