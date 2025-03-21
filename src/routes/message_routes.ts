import express from "express";
import { sendMessageHandler, getMessagesHandler } from "../controllers/message_controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Enviar un mensaje
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderId:
 *                 type: string
 *               receiverId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mensaje enviado exitosamente
 */
router.post("/", sendMessageHandler); // Corregido: ya no es /messages

/**
 * @swagger
 * /api/messages/{userId}/{contactId}:
 *   get:
 *     summary: Obtener historial de mensajes entre dos usuarios
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de mensajes obtenida correctamente
 */
router.get("/:userId/:contactId", getMessagesHandler); // Corregido también

export default router;
