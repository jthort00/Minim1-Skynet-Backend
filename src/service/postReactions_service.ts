import PostReaction, { IPostReaction } from '../models/postReactions_models.js';

export const addReaction = async (reactionData: IPostReaction) => {
    const reaction = new PostReaction(reactionData);
    return await reaction.save();
};

export const getReactionsByPost = async (postId: string) => {
    return await PostReaction.find({ postId });
};

export const countReactionsByType = async (postId: string, reactionType: 'like' | 'dislike') => {
    return await PostReaction.countDocuments({ postId, reactionType });
};