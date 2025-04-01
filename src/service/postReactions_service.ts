import PostReaction, { IPostReaction } from '../models/postReactions_models.js';

export const addReaction = async (reactionData: IPostReaction) => {
    const reaction = new PostReaction(reactionData);
    return await reaction.save();
};

export const getReactionsByPost = async (postId: string, page: number, limit: number) => {
    const skip = (page - 1) * limit;
    return await PostReaction.find({ postId })
        .skip(skip)
        .limit(limit);
};

export const countReactionsByType = async (postId: string, reactionType: 'like' | 'dislike') => {
    return await PostReaction.countDocuments({ postId, reactionType });
};