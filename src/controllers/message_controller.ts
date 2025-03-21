import { Request, Response } from "express";
import { sendMessage, getMessages } from "../service/message_service.js";

// Enviar mensaje
export const sendMessageHandler = async (req: Request, res: Response) => {
    try {
        const { senderId, receiverId, content } = req.body;
        const message = await sendMessage(senderId, receiverId, content);
        res.status(201).json(message);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error al enviar mensaje" });
    }
};

// Obtener historial de mensajes
export const getMessagesHandler = async (req: Request, res: Response) => {
    try {
        const messages = await getMessages(req.params.userId, req.params.contactId);
        res.status(200).json(messages);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error al obtener mensajes" });
    }
};
