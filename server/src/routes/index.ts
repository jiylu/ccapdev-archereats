import express from "express";
import userRoutes from "./user.routes.js";
import restaurantRoutes from "./restaurant.routes.js";
import postRoutes from "./post.routes.js";
import authRoutes from "./auth.routes.js"

const router = express.Router();

router.use("/users", userRoutes);
router.use("/restaurants", restaurantRoutes);
router.use("/posts", postRoutes);
router.use("/auth", authRoutes);

export default router;