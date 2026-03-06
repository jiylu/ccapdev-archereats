import { Request, Response } from "express";
import { IUserInput } from "../models/User.js";
import { createUserService } from "../services/user.service.js";
import { createUserSchema } from "../schemas/user.schemas.js";
import { ZodError } from "zod";  

export const createUser = async (req: Request<object, object, IUserInput>, res: Response) => {
    try {
        const validatedData = createUserSchema.parse(req.body);
        const newUser = await createUserService(validatedData);

        const { password: _, ...safeUser } = newUser.toObject();
        res.status(201).json(safeUser);
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            return res.status(400).json({ message: err.issues.map(issue => issue.message) });
        }

        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        }

        res.status(500).json({ message: "Unknown error occured" });
    }
};