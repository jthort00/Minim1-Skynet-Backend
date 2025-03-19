import Drone, { IDrone } from '../models/drone_models.js';

// Create a new drone
export const createDrone = async (droneData: IDrone) => {
    const drone = new Drone(droneData);
    return await drone.save();
};

// Get all drones with pagination
export const getDrones = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    return await Drone.find().skip(skip).limit(limit);
};

// Get a drone by ID
export const getDroneById = async (id: string) => {
    return await Drone.findById(id);
};

// Update a drone by ID
export const updateDrone = async (id: string, updateData: Partial<IDrone>) => {
    return await Drone.updateOne({ _id: id }, { $set: updateData });
};

// Delete a drone by ID
export const deleteDrone = async (id: string) => {
    return await Drone.deleteOne({ _id: id });
};