import express from 'express';
import { createUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/createUser', createUser); // url: /api/users/createUser

export default router;