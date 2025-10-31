import { pool } from "../config/db.js";

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT e.*, u.uname AS organizer_name, c.cname AS community_name
      FROM event e
      LEFT JOIN user u ON e.user_id = u.user_id
      LEFT JOIN community c ON e.community_id = c.community_id
      ORDER BY e.event_date DESC;
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create new event
export const createEvent = async (req, res) => {
  const { event_title, event_description, event_date, location, user_id, community_id } = req.body;
  if (!event_title || !event_date || !location || !user_id || !community_id)
    return res.status(400).json({ message: "Missing required fields" });

  try {
    const [result] = await pool.query(
      `INSERT INTO event (event_title, event_description, event_date, location, user_id, community_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [event_title, event_description, event_date, location, user_id, community_id]
    );
    const [created] = await pool.query("SELECT * FROM event WHERE event_id = ?", [result.insertId]);
    res.status(201).json(created[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get events for a specific community
export const getCommunityEvents = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`
      SELECT e.*, u.uname AS organizer_name
      FROM event e
      JOIN user u ON e.user_id = u.user_id
      WHERE e.community_id = ?
      ORDER BY e.event_date ASC;
    `, [id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM event WHERE event_id = ?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
