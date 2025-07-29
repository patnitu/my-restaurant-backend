import * as webhookDAO from '../models/webhookDAO.js';

export const receiveWebhook = async (req, res) => {
  try {
    const data = req.body;

    const saved = await webhookDAO.saveWebhookPayload(data);

    console.log('Saved raw webhook payload:', saved);

    res.status(200).json({ success: true, saved });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving webhook');
  }
};

export const getAllWebhooks = async (req, res) => {
  try {
    const allEvents = await webhookDAO.getAllWebhookPayloads();
    res.status(200).json(allEvents);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching webhook payloads');
  }
};

