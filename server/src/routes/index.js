import express from "express";
import userRoutes from './userRoutes.js';
import restaruantRoutes from './restaurantRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/restaurants', restaruantRoutes);

export default router;