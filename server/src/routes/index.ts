import express from "express";
import userRoutes from "./user.routes.js";
import restaurantRoutes from "./restaurant.routes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/restaurants", restaurantRoutes);

export default router;