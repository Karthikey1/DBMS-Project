import express from "express";
import { getCommunityPosts, createPost, deletePost } from "../controllers/postController.js";

const router = express.Router();

router.get("/community/:id/posts", getCommunityPosts);
router.post("/", createPost);
router.delete("/:id", deletePost);

export default router;
