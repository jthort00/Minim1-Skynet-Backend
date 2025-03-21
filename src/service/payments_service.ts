import Payment from "../models/payments_models.js";

// Registrar un pago
export const processPayment = async (orderId: string, userId: string, amount: number) => {
    const payment = new Payment({ orderId, userId, amount });
    return await payment.save();
};

// Obtener pagos de un usuario
export const getUserPayments = async (userId: string) => {
    return await Payment.find({ userId });
};
