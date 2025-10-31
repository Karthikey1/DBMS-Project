import { pool } from "../config/db.js";

// Get all posts for a community
export const getCommunityPosts = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`
      SELECT p.*, u.uname AS author_name
      FROM post p
      JOIN user u ON p.user_id = u.user_id
      WHERE p.community_id = ?
      ORDER BY p.created_at DESC;
    `, [id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create new post
export const createPost = async (req, res) => {
  const { title, content, user_id, community_id } = req.body;
  if (!title || !content || !user_id || !community_id)
    return res.status(400).json({ message: "Missing required fields" });

  try {
    const [result] = await pool.query(
      "INSERT INTO post (title, content, user_id, community_id) VALUES (?, ?, ?, ?)",
      [title, content, user_id, community_id]
    );
    const [created] = await pool.query("SELECT * FROM post WHERE post_id = ?", [result.insertId]);
    res.status(201).json(created[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM post WHERE post_id = ?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
