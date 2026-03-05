import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    user: mongoose.Types.ObjectId;
    restaurant: mongoose.Types.ObjectId;
    content: string;
    likes: number;
    creationDate: Date;
    pictures: string[];
}

const PostSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true},
    retaurant : { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    creationDate: { type: Date, default: Date.now },
    pictures: { type: [String], default: [], required: false }
})

export default mongoose.model<IPost>('Post', PostSchema);
