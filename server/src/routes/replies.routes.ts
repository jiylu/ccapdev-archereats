import { Router } from "express";
import * as repliesController from "../controllers/replies.controller.js";
import { authMiddleware } from "middlewares/auth.middleware.js";

const router = Router();

router.post("/createReply", authMiddleware, repliesController.createReply); // localhost:8080/api/replies/createReply
router.get("/getReplies/:id", repliesController.getRepliesByPostId); // localhost:8080/api/replies/getReplies/:id
router.post("/:id/like", authMiddleware, repliesController.likeReply); // localhost:8080/api/replies/:id/like
router.post("/:id/unlike", authMiddleware, repliesController.unlikeReply); // localhost:8080/api/replies/:id/unlike
router.delete("/:id", authMiddleware, repliesController.deleteReply);

export default router;