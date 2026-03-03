import express from 'express';
import { createRestaurant } from '../controllers/restaurantController.js';

const router = express.Router();

router.post('/createRestaurant', createRestaurant); // url: localhost:8080/api/restaurants/createRestaurant

export default router;