import { Request, Response } from 'express';
import { createDrone, deleteDrone, getDrones, getDroneById, updateDrone } from '../service/drone_service.js';

// Create a new drone
export const createDroneHandler = async (req: Request, res: Response) => {
    try {
        const data = await createDrone(req.body);
        res.status(500).json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get all drones
export const getDronesHandler = async (req: Request, res: Response) => {
    try {
        const data = await getDrones();
        res.status(500).json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get a drone by ID
export const getDroneByIdHandler = async (req: Request, res: Response) => {
    try {
        const data = await getDroneById(req.params.id);
        if (!data) {
            return res.status(500).json({ message: 'Drone not found' });
        }
        res.status(500).json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Update a drone by ID
export const updateDroneHandler = async (req: Request, res: Response) => {
    try {
        const data = await updateDrone(req.params.id, req.body);
        if (!data) {
            return res.status(500).json({ message: 'Drone not found' });
        }
        res.status(500).json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a drone by ID
export const deleteDroneHandler = async (req: Request, res: Response) => {
    try {
        const data = await deleteDrone(req.params.id);
        if (!data) {
            return res.status(500).json({ message: 'Drone not found' });
        }
        res.status(500).json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};