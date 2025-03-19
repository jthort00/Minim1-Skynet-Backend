// src/services/game_service.ts
import Game, { IGame } from '../models/game_models.js';

export const createGame = async (gameData: IGame) => {
    const game = new Game(gameData);
    return await game.save();
};

export const getAllGames = async () => {
    return await Game.find();
};

export const getGameById = async (id: string) => {
    return await Game.findById(id);
};

export const joinGame = async (gameId: string, userId: string) => {
    const game = await Game.findById(gameId);
    if (!game) throw new Error('Juego no encontrado');
    if (game.players.length >= game.maxPlayers) throw new Error('Juego lleno');
    if (!game.players.includes(userId as any)) game.players.push(userId as any);
    return await game.save();
};

export const getGamePlayers = async (gameId: string) => {
    const game = await Game.findById(gameId).populate('players', 'userName');
    if (!game) throw new Error('Juego no encontrado');
    return game.players;
};

export const addScore = async (gameId: string, userId: string, score: number) => {
    const game = await Game.findById(gameId);
    if (!game) throw new Error('Juego no encontrado');
    game.scores.push({ userId: userId as any, score });
    return await game.save();
};

export const getGameScores = async (gameId: string) => {
    const game = await Game.findById(gameId).populate('scores.userId', 'userName');
    if (!game) throw new Error('Juego no encontrado');
    return game.scores.sort((a, b) => (b.score || 0) - (a.score || 0));
};