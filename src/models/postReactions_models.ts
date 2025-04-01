import mongoose, { Schema, Document } from 'mongoose';

const postReactionsSchema = new Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum', // Reference to the Forum collection
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User collection
        required: true,
    },
    reactionType: {
        type: String,
        enum: ['like', 'dislike'], // Only 'like' or 'dislike' allowed
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export interface IPostReaction {
    postId: string;
    userId: string;
    reactionType: 'like' | 'dislike';
}

const PostReaction = mongoose.model<Document>('PostReaction', postReactionsSchema);
export default PostReaction;