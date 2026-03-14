import express from 'express';
import { addToFavoriteRestaurants, createUser } from 'controllers/user.controller.js';

const router = express.Router();

router.post('/createUser', createUser); // url: localhost:8080/api/users/createUser
router.post('/:userId/favorites/:restaurantId', addToFavoriteRestaurants); // localhost:8080/api/users/<userId/favorites/<restaurantid>

export default router;