import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { 
    createDrone, getDrones, getDroneById, updateDrone, deleteDrone, 
    getDronesByCategory, getDronesByPriceRange, addReviewToDrone, 
    sendMessage, getMessages, createOrder, getUserOrders, 
    updateOrderStatus, processPayment, getUserPayments 
} from '../service/drone_service.js';

// Crear un nuevo dron (Venta/Alquiler)
export const createDroneHandler = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Usuario no autenticado" });

        const droneData = { ...req.body, sellerId: req.user.id };
        const drone = await createDrone(droneData);
        res.status(201).json(drone);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error al crear el dron" });
    }
};

// Get all drones with pagination
export const getDronesHandler = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const data = await getDrones(page, limit);
        res.status(200).json(data);

    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error al obtener drones" });
    }
};

// Obtener un dron por ID
export const getDroneByIdHandler = async (req: Request, res: Response) => {
    try {
        const drone = await getDroneById(req.params.id);
        if (!drone) return res.status(404).json({ message: 'Drone no encontrado' });

        res.status(200).json(drone);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error al obtener el dron" });
    }
};

// Actualizar un dron
export const updateDroneHandler = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Usuario no autenticado" });

        const drone = await getDroneById(req.params.id);
        if (!drone) return res.status(404).json({ message: "Drone no encontrado" });

        if (drone.sellerId.toString() !== req.user.id) {
            return res.status(403).json({ message: "No tienes permiso para editar este dron" });
        }

        const updatedDrone = await updateDrone(req.params.id, req.body);
        res.status(200).json(updatedDrone);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error al actualizar el dron" });
    }
};

// Eliminar un dron
export const deleteDroneHandler = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Usuario no autenticado" });

        const drone = await getDroneById(req.params.id);
        if (!drone) return res.status(404).json({ message: "Drone no encontrado" });

        if (drone.sellerId.toString() !== req.user.id) {
            return res.status(403).json({ message: "No tienes permiso para eliminar este dron" });
        }

        await deleteDrone(req.params.id);
        res.status(200).json({ message: "Drone eliminado exitosamente" });
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error al eliminar el dron" });
    }
};

// Obtener drones por categoría
export const getDronesByCategoryHandler = async (req: Request, res: Response) => {
    try {
        const drones = await getDronesByCategory(req.params.category);
        res.status(200).json(drones);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error al obtener drones por categoría" });
    }
};

// Obtener drones en un rango de precios
export const getDronesByPriceRangeHandler = async (req: Request, res: Response) => {
    try {
        const { min, max } = req.query;
        if (!min || !max || isNaN(Number(min)) || isNaN(Number(max))) {
            return res.status(400).json({ message: "Parámetros inválidos" });
        }

        const drones = await getDronesByPriceRange(Number(min), Number(max));
        res.status(200).json(drones);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error al obtener drones en el rango de precios" });
    }
};

// Agregar una reseña a un dron
export const addDroneReviewHandler = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Usuario no autenticado" });

        const { rating, comment } = req.body;
        const drone = await addReviewToDrone(req.params.id, req.user.id, rating, comment);

        if (!drone) return res.status(404).json({ message: "Drone o usuario no encontrado" });

        res.status(200).json(drone);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error al agregar reseña" });
    }
};

// Enviar mensaje entre usuarios
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

// Crear un pedido
export const createOrderHandler = async (req: Request, res: Response) => {
    try {
        const { droneId, buyerId, sellerId } = req.body;
        const order = await createOrder(droneId, buyerId, sellerId);
        res.status(201).json(order);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error al crear pedido" });
    }
};

// Obtener pedidos de un usuario
export const getUserOrdersHandler = async (req: Request, res: Response) => {
    try {
        const orders = await getUserOrders(req.params.userId);
        res.status(200).json(orders);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error al obtener pedidos" });
    }
};

// Registrar un pago
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
