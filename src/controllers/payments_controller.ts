import { Request, Response } from "express";
import { processPayment, getUserPayments } from "../service/payments_service.js";

// Registrar pago
export const processPaymentHandler = async (req: Request, res: Response) => {
    try {
        const { orderId, userId, amount } = req.body;
        const payment = await processPayment(orderId, userId, amount);
        res.status(201).json(payment);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error al procesar pago" });
    }
};

// Obtener pagos de un usuario
export const getUserPaymentsHandler = async (req: Request, res: Response) => {
    try {
        const payments = await getUserPayments(req.params.userId);
        res.status(200).json(payments);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error al obtener pagos" });
    }
};
