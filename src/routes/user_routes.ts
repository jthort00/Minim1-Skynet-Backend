// src/routes/user_routes.ts
import express from 'express';
import {
    saveMethodHandler,
    createUserHandler,
    getAllUsersHandler,
    getUserByIdHandler,
    updateUserHandler,
    deleteUserHandler,
    logInHandler,
    addFavoriteDroneHandler,
    getFavoriteDronesHandler,
    removeFavoriteDroneHandler
} from '../controllers/user_controller.js';
import {validateUserFields} from '../middleware/userValidationSignIn.js';
import rateLimiter from '../middleware/rateLimiter.js';
const router = express.Router();

/**
 * @openapi
 * /api/main:
 *   get:
 *     summary: Página de bienvenida
 *     description: Retorna un mensaje de bienvenida.
 *     tags:
 *       - Main
 *     responses:
 *       200:
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bienvenido a la API
 */
router.get('/main', saveMethodHandler);

/**
 * @openapi
 * /api/users/signup:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Añade los detalles de un nuevo usuario comprobando si existe un usuario primero con ese email.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 items:
 *                   type: string
 *               role:
 *                 type: string
 *                 enum: [Administrador, Usuario, Empresa, Gobierno]
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 */
router.post('/users/signup',rateLimiter,validateUserFields, createUserHandler);

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Ruta para loguearse con un usuario
 *     description: Loguea al usuario.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 */

router.post('/users/login',rateLimiter, logInHandler);

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Retorna una lista de todos los usuarios.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número de usuarios por página
 *     responses:
 *       200:
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userName:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get('/users', getAllUsersHandler);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     description: Retorna los detalles de un usuario específico.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/users/:id', getUserByIdHandler);

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID
 *     description: Modifica los detalles de un usuario específico.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               friends:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/users/:id', updateUserHandler);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     description: Elimina un usuario específico de la base de datos.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/users/:id', deleteUserHandler);

/**
 * @openapi
 * /api/users/{id}/favorites:
 *   post:
 *     summary: Añade un drone a los favoritos del usuario
 *     description: Agrega un drone a la lista de favoritos del usuario si no está ya incluido.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               droneId:
 *                 type: string
 *                 description: ID del drone a añadir como favorito
 *     responses:
 *       200:
 *         description: Drone añadido a favoritos exitosamente
 *       404:
 *         description: Usuario no encontrado
 */

router.post('/users/:id/favorites', addFavoriteDroneHandler);

/**
 * @openapi
 * /api/users/{id}/favorites:
 *   get:
 *     summary: Obtiene los drones favoritos de un usuario
 *     description: Retorna una lista de drones que el usuario ha marcado como favoritos.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de drones favoritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Drone'
 *       404:
 *         description: Usuario no encontrado
 */

router.get('/users/:id/favorites', getFavoriteDronesHandler);

/**
 * @openapi
 * /api/users/{id}/favorites/{droneId}:
 *   delete:
 *     summary: Elimina un drone de los favoritos del usuario
 *     description: Quita un drone de la lista de favoritos del usuario.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *       - name: droneId
 *         in: path
 *         required: true
 *         description: ID del drone a eliminar de favoritos
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Drone eliminado de favoritos exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/users/:id/favorites/:droneId', removeFavoriteDroneHandler);

/**
 * @openapi
 * components:
 *   schemas:
 *     Drone:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         model:
 *           type: string
 *         price:
 *           type: number
 *         description:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         type:
 *           type: string
 *           enum: [venta, alquiler]
 *         condition:
 *           type: string
 *           enum: [nuevo, usado]
 *         location:
 *           type: string
 *         contact:
 *           type: string
 *         category:
 *           type: string
 *         sellerId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */
//afegeixo el model drone perque no el té definit el swagger i es queixa
//aixo passa per que per primer cop usem un model diferent a user

export default router;
