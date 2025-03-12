import mongoose from "mongoose";

const droneSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

export interface IDrone {
    id: number;
    name: string;
    model: string;
    price: number;
}

const Drone = mongoose.model('Drone', droneSchema);
export default Drone;
