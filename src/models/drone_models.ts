import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true }
});

const droneSchema = new mongoose.Schema({
    id: { type: String, required: true },  
    name: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    type: { type: String, enum: ['venta', 'alquiler'], required: true },
    condition: { type: String, enum: ['nuevo', 'usado'], required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    category: { type: String, required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    ratings: [ratingSchema]
});

export interface IRating {
    userId: string;
    rating: number;
    comment: string;
}

export interface IDrone {
    id: string;
    name: string;
    model: string;
    price: number;
    description: string;
    images: string[];
    type: 'venta' | 'alquiler';
    condition: 'nuevo' | 'usado';
    location: string;
    contact: string;
    category: string;
    sellerId: string;
    createdAt?: Date;
    ratings: IRating[];
}

// Modelos
const Drone = mongoose.model('Drone', droneSchema);

export default Drone;

