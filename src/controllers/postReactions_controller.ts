import { Request, Response } from 'express';
import { addReaction, getReactionsByPost, countReactionsByType, deleteReactionById } from '../service/postReactions_service.js';

export const addReactionHandler = async (req: Request, res: Response) => {
    try {
        const data = await addReaction(req.body);
        res.status(201).json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getReactionsHandler = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const reactions = await getReactionsByPost(postId, page, limit);
        res.status(200).json(reactions);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const countReactionsHandler = async (req: Request, res: Response) => {
    try {
        const { postId, reactionType } = req.query;
        const count = await countReactionsByType(postId as string, reactionType as 'like' | 'dislike');
        res.status(200).json({ count });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteReactionHandler = async (req: Request, res: Response) => {
    try {
        const reactionId = req.params.reactionId;
        const deletedReaction = await deleteReactionById(reactionId);

        if (!deletedReaction) {
            return res.status(404).json({ message: 'Reaction not found' });
        }

        res.status(200).json({ message: 'Reaction deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};