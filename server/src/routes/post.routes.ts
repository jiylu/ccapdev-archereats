import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import { authMiddleware } from 'middlewares/auth.middleware.js';
import upload from 'middlewares/upload.middleware.js';

const router = Router();

router.post("/createPost", authMiddleware, upload.array("pictures", 6), postController.createPost); // url: localhost:8080/api/posts/createPost
router.patch("/editPost/:id", authMiddleware, upload.array("pictures", 6), postController.editPostController);
router.get("/getPosts", postController.getPosts); // url: localhost:8080/api/posts/getPosts
router.post("/:id/like", authMiddleware, postController.likePost); // url: localhost:8080/api/posts/:id/like
router.post("/:id/unlike", authMiddleware, postController.unlikePost); // url: localhost:8080/api/posts/:id/unlike
router.get("/getPosts/:id", postController.getPostsByRestaurantId) //localhost:8080/api/posts/getPosts
router.patch("/deletePost/:id", authMiddleware, postController.deletePost) //  localhost:8080/api/posts/deletePost/:id
router.get("/get-posts/user/:userId", postController.fetchPostsByUser)// localhost:8080/api/posts/get-posts/user/:id

export default router;