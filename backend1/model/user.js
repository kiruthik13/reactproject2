import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    phone: { type: String },
    skills: [{ type: String }],
    education: {
        degree: { type: String },
        institution: { type: String },
        graduationYear: { type: Number }
    },
    placementStatus: {
        type: String,
        enum: ['Not Placed', 'In Process', 'Placed'],
        default: 'Not Placed'
    },
    company: { type: String },
    salary: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
UserSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const User = mongoose.model('Users', UserSchema);

export default User;