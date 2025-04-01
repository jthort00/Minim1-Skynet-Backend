import { Request, Response } from 'express';
import { addReaction, getReactionsByPost, countReactionsByType } from '../service/postReactions_service.js';

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
        const reactions = await getReactionsByPost(postId);
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