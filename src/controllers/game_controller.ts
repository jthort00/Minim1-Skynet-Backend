// src/controllers/game_controller.ts
import { Request, Response } from 'express';
import { createGame, getAllGames, getGameById, joinGame, getGamePlayers, addScore, getGameScores } from '../service/game_service.js';

export const createGameHandler = async (req: Request, res: Response) => {
    try {
        const game = await createGame(req.body);
        res.status(201).json(game);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Error desconocido" });
        }
    }    
};

export const getAllGamesHandler = async (_req: Request, res: Response) => {
    try {
        const games = await getAllGames();
        res.status(200).json(games);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Error desconocido" });
        }
    }    
};

export const getGameByIdHandler = async (req: Request, res: Response) => {
    try {
        const game = await getGameById(req.params.id);
        if (!game) return res.status(404).json({ message: 'Juego no encontrado' });
        res.status(200).json(game);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Error desconocido" });
        }
    }    
};

export const joinGameHandler = async (req: Request, res: Response) => {
    try {
        const game = await joinGame(req.params.id, req.body.userId);
        res.status(200).json(game);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Error desconocido" });
        }
    }    
};

export const getGamePlayersHandler = async (req: Request, res: Response) => {
    try {
        const players = await getGamePlayers(req.params.id);
        res.status(200).json(players);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Error desconocido" });
        }
    }    
};

export const addScoreHandler = async (req: Request, res: Response) => {
    try {
        const game = await addScore(req.params.id, req.body.userId, req.body.score);
        res.status(200).json(game);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Error desconocido" });
        }
    }    
};

export const getGameScoresHandler = async (req: Request, res: Response) => {
    try {
        const scores = await getGameScores(req.params.id);
        res.status(200).json(scores);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Error desconocido" });
        }
    }    
};