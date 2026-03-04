import express from "express";
import { createRestaurant } from "controllers/restaurant.controller.js";

const router = express.Router();

router.post('/createRestaurant', createRestaurant); // url: localhost:8080/api/users/createUser

export default router;