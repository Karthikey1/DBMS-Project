import { pool } from "../config/db.js";

export const getUsers = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM user");
  res.json(rows);
};

export const getUserById = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM user WHERE user_id = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ message: "User not found" });
  res.json(rows[0]);
};
