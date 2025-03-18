// src/services/user_service.ts
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

export const logIn = async (email: string, password: string) => {
    return await User.findOne({ email, password, isDeleted: false });
};
