import express from "express";
import { createRestaurant, getAllRestaurants, getRestaurantById, getRestaurantByName } from "controllers/restaurant.controller.js";
import upload from "middlewares/upload.middleware.js";

const router = express.Router();

router.post('/createRestaurant', upload.array("images", 5),createRestaurant); // url: localhost:8080/api/restaurants/createRestaurant
router.get('/getRestaurants', getAllRestaurants);  // url: localhost:8080/api/restaurants/getRestaurants
router.get('/:id', getRestaurantById);  // url: localhost:8080/api/restaurants/:id
router.get('/restaurantName/:name', getRestaurantByName) // url: http://localhost:8080/api/restaurants/restaurantName/name
export default router;