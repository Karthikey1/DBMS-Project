import express from "express";
import {
  getAllEvents,
  createEvent,
  getCommunityEvents,
  deleteEvent
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getAllEvents);
router.post("/", createEvent);
router.get("/community/:id/events", getCommunityEvents);
router.delete("/:id", deleteEvent);

export default router;
