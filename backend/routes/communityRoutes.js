import express from "express";
import {
  getCommunities,
  getCommunityById,
  createCommunity,
  getUserCommunities
} from "../controllers/communityController.js";

const router = express.Router();

router.get("/", getCommunities);
router.get("/:id", getCommunityById);
router.post("/", createCommunity);
router.get("/user/:id", getUserCommunities);

export default router;
