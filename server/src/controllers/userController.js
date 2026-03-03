import { createUserService } from "../services/userService.js";

export const createUser = async (req,res) => {
    try {
        const newUser = await createUserService(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}