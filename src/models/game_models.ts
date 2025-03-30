// src/models/game_models.ts
import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['carreras', 'competencia', 'obstaculos'], required: true },
    maxPlayers: { type: Number, default: 4 },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    scores: [{ userId: mongoose.Schema.Types.ObjectId, score: Number }],
    createdAt: { type: Date, default: Date.now }
});

export interface IGame {
    name: string;
    type: 'carreras' | 'competencia' | 'obstaculos';
    maxPlayers: number;
    players: mongoose.Types.ObjectId[];
    scores: { userId: mongoose.Types.ObjectId; score: number }[];
}

const Game = mongoose.model('Game', gameSchema);
export default Game;