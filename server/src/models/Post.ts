import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    user: mongoose.Types.ObjectId;
    restaurant: mongoose.Types.ObjectId;
    content: string;
    likes: number;
    creationDate: Date;
    pictures: string[];
    replies: mongoose.Types.ObjectId[]; // Array of reply IDs
    isAnonymous: boolean; 
}

const PostSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true},
    restaurant : { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    creationDate: { type: Date, default: Date.now },
    pictures: { type: [String], default: [], required: false },
    replies: [{ type: Schema.Types.ObjectId, ref: "Post" }], // Array of reply IDs
    isAnonymous: { type: Boolean, default: false, required: true }  
});

export default mongoose.model<IPost>('Post', PostSchema);
