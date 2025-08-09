// routes/webhookRoutes.js
import express from 'express';
import * as webhookController from '../controllers/webhookController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Webhooks
 *   description: Webhook receiver and logs
 */

/**
 * @swagger
 * /webhooks:
 *   post:
 *     summary: Receive a webhook
 *     tags: [Webhooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Payload sent by the webhook provider
 *     responses:
 *       200:
 *         description: Webhook received successfully
 */
router.post('/', webhookController.receiveWebhook);

/**
 * @swagger
 * /webhooks:
 *   get:
 *     summary: Get all received webhooks
 *     tags: [Webhooks]
 *     responses:
 *       200:
 *         description: List of all stored webhook payloads
 */
router.get('/', webhookController.getAllWebhooks);

export default router;
