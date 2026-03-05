import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';

const router = Router();

router.post("/createPost", postController.createPost); // url: localhost:8080/api/posts/createPost
router.post("/getPosts", postController.getPosts); // url: localhost:8080/api/posts/getPosts
router.post("/:id/like", postController.likePost); // url: localhost:8080/api/posts/:id/like
router.post("/:id/reply", postController.replyToPost); // url: localhost:8080/api/posts/:id/reply

export default router;