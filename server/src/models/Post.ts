import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    user: mongoose.Types.ObjectId;
    restaurant: mongoose.Types.ObjectId;
    rating: number; 
    content: string;
    likes: number;
    creationDate: Date;
    pictures: string[];
    replies: mongoose.Types.ObjectId[]; // Array of reply IDs
    isAnonymous: boolean;
    ratePricing: string;
    waitTime: string;
    recommended: boolean;
}

const PostSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true},
    restaurant : { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    rating: { type: Number, min: 1, max: 5 },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    creationDate: { type: Date, default: Date.now },
    pictures: { type: [String], default: [], required: false },
    replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }], // Array of reply IDs
    isAnonymous: { type: Boolean, default: false, required: true },
    ratePricing: { type: String, enum: ["P", "PP", "PPP"] },
    waitTime: { type: String, enum: ["No Wait", "15-30m", "1hr+"] },
    recommended: { type: Boolean, default: true },
    deleted : { type: Boolean, default: false}
});

export default mongoose.model<IPost>('Post', PostSchema);
