import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import { authMiddleware } from 'middlewares/auth.middleware.js';
import multer from "multer";

const upload = multer({ dest: "uploads/"}); // temporary storage muna

const router = Router();

router.post("/createPost", authMiddleware, upload.array("pictures"), postController.createPost); // url: localhost:8080/api/posts/createPost
router.post("/getPosts", postController.getPosts); // url: localhost:8080/api/posts/getPosts
router.post("/:id/like", authMiddleware, postController.likePost); // url: localhost:8080/api/posts/:id/like
router.post("/:id/reply", authMiddleware, postController.replyToPost); // url: localhost:8080/api/posts/:id/reply

export default router;