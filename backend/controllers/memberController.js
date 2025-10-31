import { pool } from "../config/db.js";

// Join community
export const joinCommunity = async (req, res) => {
  const { user_id, community_id, role } = req.body;
  if (!user_id || !community_id)
    return res.status(400).json({ message: "user_id and community_id are required" });

  try {
    // Check if already a member
    const [exists] = await pool.query(
      "SELECT * FROM members WHERE user_id = ? AND community_id = ?",
      [user_id, community_id]
    );
    if (exists.length > 0)
      return res.status(400).json({ message: "User already joined this community" });

    const [result] = await pool.query(
      "INSERT INTO members (user_id, community_id, role) VALUES (?, ?, ?)",
      [user_id, community_id, role || "member"]
    );
    const [created] = await pool.query("SELECT * FROM members WHERE membership_id = ?", [result.insertId]);
    res.status(201).json(created[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Leave community
export const leaveCommunity = async (req, res) => {
  const { membershipId } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM members WHERE membership_id = ?", [membershipId]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Membership not found" });
    res.json({ message: "Left community successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get members of a community
export const getCommunityMembers = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`
      SELECT m.membership_id, m.user_id, u.uname, m.role, m.joined_on
      FROM members m
      JOIN user u ON m.user_id = u.user_id
      WHERE m.community_id = ?
      ORDER BY m.joined_on DESC;
    `, [id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
