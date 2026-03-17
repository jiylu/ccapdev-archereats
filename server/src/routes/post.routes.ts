import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import { authMiddleware } from 'middlewares/auth.middleware.js';
import multer from "multer";

const upload = multer({ dest: "uploads/"}); // temporary storage muna

const router = Router();

router.post("/createPost", authMiddleware, upload.array("images", 6), postController.createPost); // url: localhost:8080/api/posts/createPost
router.get("/getPosts", postController.getPosts); // url: localhost:8080/api/posts/getPosts
router.post("/:id/like", authMiddleware, postController.likePost); // url: localhost:8080/api/posts/:id/like
router.post("/:id/reply", authMiddleware, postController.replyToPost); // url: localhost:8080/api/posts/:id/reply
router.get("/getPosts/:id", postController.getPostsByRestaurantId) //localhost:8080/api/posts/getPosts
router.patch("/deletePost/:id", authMiddleware, postController.deletePost) //  localhost:8080/api/posts/deletePost/:id
router.patch("/editPost/:id", postController.editPostController) // localhost:8080/api/posts/editPost/:id
export default router;