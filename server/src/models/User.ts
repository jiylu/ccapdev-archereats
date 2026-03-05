import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IUserInput {
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    isStudent: boolean,
    biography?: string
}

export interface IUser extends IUserInput, Document {}

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    password: {type: String, required: true},
    isStudent: {type: Boolean, required: true},
    biography: {type: String, required: false}
}, {timestamps: true})

export default mongoose.model<IUser>('User', userSchema);