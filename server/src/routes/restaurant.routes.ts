import express from "express";
import { createRestaurant, getAllRestaurants, getRestaurantById, getRestaurantByName, getOwnedRestaurants, updateRestaurant, deleteRestaurant } from "controllers/restaurant.controller.js";
import { authMiddleware } from "middlewares/auth.middleware.js";
import upload from "middlewares/upload.middleware.js";

const router = express.Router();

router.post('/createRestaurant', authMiddleware, upload.array("images", 6), createRestaurant); // url: localhost:8080/api/restaurants/createRestaurant
router.get('/ownedRestaurants', authMiddleware, getOwnedRestaurants);
router.get('/getRestaurants', getAllRestaurants);  // url: localhost:8080/api/restaurants/getRestaurants
router.put('/updateRestaurant/:id', authMiddleware, upload.array("images", 6), updateRestaurant);
router.delete('/deleteRestaurant/:id', authMiddleware, deleteRestaurant);
router.get('/restaurantName/:name', getRestaurantByName) // url: http://localhost:8080/api/restaurants/restaurantName/name // url: http://localhost:8080/api/restaurants/ownedRestaurants
router.get('/:id', getRestaurantById);  // url: localhost:8080/api/restaurants/:id

export default router;