import express from 'express';
import { processPaymentHandler, getUserPaymentsHandler } from '../controllers/payments_controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Procesamiento de pagos
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Registrar un pago
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               userId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Pago registrado exitosamente
 *       500:
 *         description: Error al procesar pago
 */
router.post('/', processPaymentHandler);

/**
 * @swagger
 * /api/payments/{userId}:
 *   get:
 *     summary: Obtener pagos de un usuario
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de pagos del usuario
 *       500:
 *         description: Error al obtener pagos
 */
router.get('/:userId', getUserPaymentsHandler);

export default router;
