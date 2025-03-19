// src/services/user_service.ts
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/user_models.js';

export const saveMethod = () => {
    return 'Hola';
};
export const createUser = async (userData: IUser) => {
    
    
    const existingUserEmail = await User.findOne({ email: userData.email }); //Política de un correo = un usuario
    if (existingUserEmail) {
        throw new Error('Ya existe un usuario con este correo');
    }

    const existingUserName = await User.findOne({ userName: userData.userName }); //Política de un nombre = un usuario
    if (existingUserName) {
        throw new Error('Ya existe un usuario con este nombre');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        throw new Error('Formato de email inválido');
    }
    
    const user = new User(userData);
    return await user.save();
};

export const getAllUsers = async () => {
    return await User.find({ isDeleted: false });
};

export const getUserById = async (id: string) => {
    return await User.findOne({ _id: id, isDeleted: false });
};

export const updateUser = async (id: string, updateData: Partial<IUser>) => {
    return await User.updateOne({ _id: id, isDeleted: false }, { $set: updateData });
};

export const deleteUser = async (id: string) => {
    return await User.updateOne({ _id: id }, { isDeleted: true });
};

export const logIn = async (email: string, password: string) => { //copilot me ayudó
    try {
        // Validar que los campos no estén vacíos
        if (!email || !password) {
            throw new Error('El email y la contraseña son obligatorios');
        }

        // Validar el formato del email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Formato de email inválido');
        }

        // Buscar al usuario en la base de datos
        const user = await User.findOne({ email, isDeleted: false });
        if (!user) {
            throw new Error('Usuario no encontrado o eliminado');
        }
       
        const specialCharRegex = /[^a-zA-Z0-9]/;
        if (specialCharRegex.test(password)) {
            throw new Error('La contraseña no debe contener caracteres especiales');
        }

        // Comparar la contraseña ingresada con la almacenada
        const isMatch = await bcrypt.compare(password, user.password as string);
        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }

        return user; // Credenciales correctas, devuelve el usuario
    } catch (error: any) {
        throw new Error(error.message || 'Error al iniciar sesión');
    }
};