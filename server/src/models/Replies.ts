import mongoose, { Schema, Document } from "mongoose";

export interface IReply extends Document {
    user: mongoose.Types.ObjectId;
    post: mongoose.Types.ObjectId;
    content: string;
    isAnonymous: boolean;
    likes: number;
    creationDate: Date;
    deleted: boolean;
}

const ReplySchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    content: { type: String, required: true },
    isAnonymous: { type: Boolean, default: false, required: true },
    likes: { type: Number, default: 0 },
    creationDate: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
});

export default mongoose.model<IReply>("Reply", ReplySchema);