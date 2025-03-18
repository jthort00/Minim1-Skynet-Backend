import express from 'express';
import { createDroneHandler, 
        deleteDroneHandler, 
        getDronesHandler,
        getDroneByIdHandler,
        updateDroneHandler } from '../controllers/drone_controller.js';

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
 *           type: number
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               name:
 *                 type: string
 *               model:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Drone created
 *       400:
 *         description: Invalid input
 */
router.post('/drones', createDroneHandler);

/**
 * @swagger
 * /drones/{id}:
 *   put:
 *     summary: Update a drone by ID
 *     tags: [Drones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Drone ID
 *         schema:
 *           type: number
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
 */
router.put('/drones/:id', updateDroneHandler);

/**
 * @swagger
 * /drones/{id}:
 *   delete:
 *     summary: Delete a drone by ID
 *     tags: [Drones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Drone ID
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Drone deleted
 *       404:
 *         description: Drone not found
 */
router.delete('/drones/:id', deleteDroneHandler);

export default router;