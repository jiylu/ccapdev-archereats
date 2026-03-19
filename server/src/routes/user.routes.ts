import express from 'express';
import upload from "middlewares/upload.middleware.js";
import { addToFavoriteRestaurants, createUser, fetchUserById, removeFromFavoriteRestaurants, updateUserById, checkUsernameAvailability, fetchUserByUsername, resetPassword } from 'controllers/user.controller.js';

const router = express.Router();

router.post('/createUser', createUser); // url: localhost:8080/api/users/createUser
router.get("/check-username", checkUsernameAvailability);
router.get('/:userId', fetchUserById) // localhost:8080/api/users/<id>;
router.patch('/:userId', upload.single("avatar"), updateUserById);
router.post('/:userId/favorites/:restaurantId', addToFavoriteRestaurants); // localhost:8080/api/users/<userId/favorites/<restaurantid>
router.patch('/:userId/favorites/:restaurantId', removeFromFavoriteRestaurants); //localhost:8080/api/users/<userId/favorites/<restaurantid>
router.get("/username/:username", fetchUserByUsername) 
router.post("/reset-password", resetPassword) // localhost:8080/api/users/resetpassword


export default router;