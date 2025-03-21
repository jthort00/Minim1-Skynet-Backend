import Message from "../models/message_models.js";

// Enviar un mensaje
export const sendMessage = async (senderId: string, receiverId: string, content: string) => {
    const message = new Message({ senderId, receiverId, content });
    return await message.save();
};

// Obtener historial de mensajes entre dos usuarios
export const getMessages = async (userId: string, contactId: string) => {
    return await Message.find({
        $or: [
            { senderId: userId, receiverId: contactId },
            { senderId: contactId, receiverId: userId }
        ]
    }).sort({ timestamp: 1 });
};
