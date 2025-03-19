import { createEntry, deleteEntry, getAllForum, getEntryById, updateEntry } from '../service/forum_service.js';
import express, { Request, Response } from 'express';

export const createEntryHandler = async (req: Request, res: Response) => {
    try {
        const data = await createEntry(req.body);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
// Get all forums with pagination
export const getAllForumHandler = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const data = await getAllForum(page, limit);
        res.status(200).json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const getEntryByIdHandler = async (req: Request, res: Response) => {
    try {
        const data = await getEntryById(req.params.id);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const updateEntryHandler = async (req: Request, res: Response) => {
    try {
        const data = await updateEntry(req.params.id, req.body);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteEntryHandler = async (req: Request, res: Response) => {
    try {
        const data = await deleteEntry(req.params.id);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
