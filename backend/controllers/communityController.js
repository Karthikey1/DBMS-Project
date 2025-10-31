import { pool } from "../config/db.js";

// Get all communities with creator name + member count
export const getCommunities = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.*, u.uname AS creator_name,
        (SELECT COUNT(*) FROM members m WHERE m.community_id = c.community_id) AS member_count
      FROM community c
      LEFT JOIN user u ON c.user_id = u.user_id
      ORDER BY c.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Get single community by ID
export const getCommunityById = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT c.*, u.uname AS creator_name FROM community c 
     LEFT JOIN user u ON c.user_id = u.user_id WHERE community_id = ?`,
    [req.params.id]
  );
  if (rows.length === 0) return res.status(404).json({ message: "Community not found" });
  res.json(rows[0]);
};

// Create new community
export const createCommunity = async (req, res) => {
  const { cname, description, user_id } = req.body;
  if (!cname || !user_id)
    return res.status(400).json({ message: "cname and user_id are required" });

  const [result] = await pool.query(
    "INSERT INTO community (cname, description, user_id) VALUES (?, ?, ?)",
    [cname, description, user_id]
  );

  const [created] = await pool.query("SELECT * FROM community WHERE community_id = ?", [result.insertId]);
  res.status(201).json(created[0]);
};

// Get all communities joined by a user
export const getUserCommunities = async (req, res) => {
  const [rows] = await pool.query(`
    SELECT c.* FROM community c
    JOIN members m ON c.community_id = m.community_id
    WHERE m.user_id = ?;
  `, [req.params.id]);
  res.json(rows);
};
