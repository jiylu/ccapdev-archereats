import express from 'express';
import { addToFavoriteRestaurants, createUser, fetchUserById, removeFromFavoriteRestaurants } from 'controllers/user.controller.js';

const router = express.Router();

router.post('/createUser', createUser); // url: localhost:8080/api/users/createUser
router.get('/:userId', fetchUserById) // localhost:8080/api/users/<id>;
router.post('/:userId/favorites/:restaurantId', addToFavoriteRestaurants); // localhost:8080/api/users/<userId/favorites/<restaurantid>
router.patch('/:userId/favorites/:restaurantId', removeFromFavoriteRestaurants); //localhost:8080/api/users/<userId/favorites/<restaurantid>
export default router;