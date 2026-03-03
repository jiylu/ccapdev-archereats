import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    password: {type: String, required: true},
    isStudent: {type: Boolean, required: true}
}, {timestamps: true})

export default mongoose.model('User', userSchema);