import express from 'express';
import { addReactionHandler, getReactionsHandler, countReactionsHandler } from '../controllers/postReactions_controller.js';

const router = express.Router();

/**
 * @openapi
 * /api/forum/reactions:
 *   post:
 *     summary: Add a reaction to a forum post
 *     tags:
 *       - Forum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *               userId:
 *                 type: string
 *               reactionType:
 *                 type: string
 *                 enum: [like, dislike]
 *     responses:
 *       201:
 *         description: Reaction added successfully
 */
router.post('/forum/reactions', addReactionHandler);

/**
 * @openapi
 * /api/forum/reactions/{postId}:
 *   get:
 *     summary: Get all reactions for a forum post
 *     tags:
 *       - Forum
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reactions
 */
router.get('/forum/reactions/:postId', getReactionsHandler);

/**
 * @openapi
 * /api/forum/reactions/count:
 *   get:
 *     summary: Count reactions by type for a forum post
 *     tags:
 *       - Forum
 *     parameters:
 *       - name: postId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: reactionType
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           enum: [like, dislike]
 *     responses:
 *       200:
 *         description: Count of reactions
 */
router.get('/forum/reactions/count', countReactionsHandler);

export default router;