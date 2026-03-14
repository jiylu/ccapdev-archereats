import { Request, Response } from "express";
import { IUserInput } from "../models/User.js";
import { addFavoriteRestaurantService, createUserService } from "../services/user.service.js";
import { createUserSchema } from "../schemas/user.schemas.js";
import { ZodError } from "zod";  
import { logger } from "utils/logger.js";

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

export const addToFavoriteRestaurants = async ( req: Request, res: Response) => {
    try {
        const { userId, restaurantId } = req.params;

        if (!userId || !restaurantId || Array.isArray(userId) || Array.isArray(restaurantId)) {
            logger.error("Invalid parameters for addToFavoriteRestaurants.")
            return res.status(400).json({ error: "Invalid parameters."})
        }

        await addFavoriteRestaurantService(userId, restaurantId);
        logger.info(`Restaurant ${restaurantId} added to ${userId} favorites list`)
        res.status(200).json({ message: `Restaurant ${restaurantId} added to ${userId} favorites list`})
    } catch (err: unknown) {
        logger.error("addToFavoriteRestaurants controller error.", { error: err instanceof Error ? err.message : err }); 
        res.status(400).json({ message: err instanceof Error ? err.message: err})
    }
    
}