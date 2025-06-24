import mongoose from "mongoose";

const TrainingModuleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true }, // e.g., "2 weeks"
    difficulty: { 
        type: String, 
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skills' }],
    content: [{ 
        title: { type: String },
        type: { type: String, enum: ['video', 'document', 'quiz', 'assignment'] },
        url: { type: String },
        duration: { type: String } // for videos
    }],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

TrainingModuleSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const TrainingModule = mongoose.model('TrainingModules', TrainingModuleSchema);

export default TrainingModule; 