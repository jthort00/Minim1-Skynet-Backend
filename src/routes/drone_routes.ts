import express from 'express';
import { 
        createDroneHandler, deleteDroneHandler, getDronesHandler, 
        getDroneByIdHandler, updateDroneHandler, addDroneReviewHandler, 
        getDronesByCategoryHandler, getDronesByPriceRangeHandler, sendMessageHandler, 
        getMessagesHandler, getUserOrdersHandler,getUserPaymentsHandler, createOrderHandler 

} from '../controllers/drone_controller.js';

const router = express.Router();

/**
 * @swagger
 * /drones:
 *   get:
 *     summary: Get all drones
 *     tags: [Drones]
 *     responses:
 *       200:
 *         description: List of all drones
 */
router.get('/drones', getDronesHandler);

/**
 * @swagger
 * /drones/{id}:
 *   get:
 *     summary: Get a drone by ID
 *     tags: [Drones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Drone ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Drone data
 *       404:
 *         description: Drone not found
 */
router.get('/drones/:id', getDroneByIdHandler);

/**
 * @swagger
 * /drones:
 *   post:
 *     summary: Create a new drone
 *     tags: [Drones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - model
 *               - price
 *               - description
 *               - type
 *               - condition
 *               - location
 *               - contact
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               model:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: ['venta', 'alquiler']
 *               condition:
 *                 type: string
 *                 enum: ['nuevo', 'usado']
 *               location:
 *                 type: string
 *               contact:
 *                 type: string
 *               category:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Drone created
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/drones', createDroneHandler);

/**
 * @swagger
 * /drones/{id}:
 *   put:
 *     summary: Update a drone by ID
 *     tags: [Drones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Drone ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               model:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Drone updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Drone not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put('/drones/:id', updateDroneHandler);

/**
 * @swagger
 * /drones/{id}:
 *   delete:
 *     summary: Delete a drone by ID
 *     tags: [Drones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Drone ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Drone deleted
 *       404:
 *         description: Drone not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete('/drones/:id', deleteDroneHandler);

/**
 * @swagger
 * /drones/{id}/review:
 *   post:
 *     summary: Add a review to a drone
 *     tags: [Drones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the drone to review
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comment
 *             properties:
 *               rating:
 *                 type: number
 *                 description: Rating given to the drone (1-5)
 *               comment:
 *                 type: string
 *                 description: Review comment about the drone
 *     responses:
 *       200:
 *         description: Review added successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Drone not found
 *       500:
 *         description: Internal server error
 */
router.post('/drones/:id/review', addDroneReviewHandler);

/**
 * @swagger
 * /drones/category/{category}:
 *   get:
 *     summary: Get drones by category
 *     tags: [Drones]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: Category of the drones
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of drones in the given category
 *       400:
 *         description: Invalid category
 */
router.get('/drones/category/:category', getDronesByCategoryHandler);

/**
 * @swagger
 * /drones/price:
 *   get:
 *     summary: Get drones within a price range
 *     tags: [Drones]
 *     parameters:
 *       - in: query
 *         name: min
 *         required: true
 *         description: Minimum price
 *         schema:
 *           type: number
 *       - in: query
 *         name: max
 *         required: true
 *         description: Maximum price
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of drones within the price range
 *       400:
 *         description: Invalid price range
 */
router.get('/drones/price', getDronesByPriceRangeHandler);


/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Send a message
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
 *         description: Message sent successfully
 */
router.post('/messages', sendMessageHandler);


/**
 * @swagger
 * /messages/{userId}/{contactId}:
 *   get:
 *     summary: Get messages between two users
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
 *         description: List of messages retrieved successfully
 */
router.get('/messages/:userId/:contactId', getMessagesHandler);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               droneId:
 *                 type: string
 *               buyerId:
 *                 type: string
 *               sellerId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post('/orders', createOrderHandler);

/**
 * @swagger
 * /orders/{userId}:
 *   get:
 *     summary: Get orders of a user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user orders
 *       404:
 *         description: No orders found
 */
router.get('/orders/:userId', getUserOrdersHandler);

/**
 * @swagger
 * /payments/{userId}:
 *   get:
 *     summary: Get payments of a user
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user payments
 *       404:
 *         description: No payments found
 */
router.get('/payments/:userId', getUserPaymentsHandler);


export default router;
