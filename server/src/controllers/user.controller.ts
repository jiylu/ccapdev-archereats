import { Request, Response } from "express";
import { IUserInput } from "../models/User.js";
import { createUserService } from "../services/user.service.js";

export const createUser = async (req: Request<object, object, IUserInput>, res: Response) => {
    try {
        const newUser = await createUserService(req.body);
        res.status(201).json(newUser);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: err });
        }
    }
};