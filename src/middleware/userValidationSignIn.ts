// src/middleware/validateUser.ts
import { Request, Response, NextFunction } from 'express';
import User from '../models/user_models.js';

export const validateUserFields = async (req: Request, res: Response, next: NextFunction) => {
    const { email, userName } = req.body;

    try {

        
        // Validar si el correo ya está en uso
        const existingUserEmail = await User.findOne({ email });
        if (existingUserEmail) {
            return res.status(401).json({ message: 'Ya existe un usuario con este correo' });
        }

        // Validar si el nombre de usuario ya está en uso
        const existingUserName = await User.findOne({ userName });
        if (existingUserName) {
            return res.status(401).json({ message: 'Ya existe un usuario con este nombre' });
        }


        next();  // Si pasa la validación, continuar con la siguiente función en la cadena
    } catch (error) {
        return res.status(500).json({ message: 'Error al validar los campos de usuario' });
    }
};
