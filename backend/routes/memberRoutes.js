import express from "express";
import {
  joinCommunity,
  leaveCommunity,
  getCommunityMembers
} from "../controllers/memberController.js";

const router = express.Router();

router.post("/join", joinCommunity);
router.delete("/leave/:membershipId", leaveCommunity);
router.get("/community/:id/members", getCommunityMembers);

export default router;
