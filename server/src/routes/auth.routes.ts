import { loginUser } from '../controllers/auth.controller.js';
import express from 'express'

const router = express.Router();

router.post('/', loginUser) // localhost:8080/api/auth/

export default router;