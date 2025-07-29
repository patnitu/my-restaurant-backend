import pool from '../db.js';

export const saveWebhookPayload = async (payload) => {
  const result = await pool.query(
    `INSERT INTO webhook_events (payload) VALUES ($1) RETURNING *`,
    [payload]
  );
  return result.rows[0];
};

export const getAllWebhookPayloads = async () => {
  const result = await pool.query(
    `SELECT id, event_type, payload, received_at
     FROM webhook_events
     ORDER BY received_at DESC`
  );
  return result.rows;
};

