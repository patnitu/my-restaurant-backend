import pool from '../db.js';

export const saveWebhookPayload = async (payload) => {
  const result = await pool.query(
    `INSERT INTO webhook_events (payload) VALUES ($1) RETURNING *`,
    [payload]
  );
  return result.rows[0];
};
