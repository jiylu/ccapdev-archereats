import { Request, Response } from "express";
import { IUserInput } from "../models/User.js";
import { addFavoriteRestaurantService, createUserService, fetchUserByIdService, removeFavoriteRestaurantService } from "../services/user.service.js";
import { createUserSchema } from "../schemas/user.schemas.js";
import { ZodError } from "zod";  
import { logger } from "utils/logger.js";
import mongoose from "mongoose";

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

export const fetchUserById = async (req: Request, res: Response) => {
    logger.info(`GET fetchUserById called`, { id: req.params.userId });
    
    try {
        const { userId } = req.params;

        if (!userId || Array.isArray(userId)) {
            logger.info(`userId Parameter typof: ${typeof(userId)} `)
            logger.error("Invalid paramters for fetchUser.")
            return res.status(400).json({ error: "Invalid parameters." })
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            logger.warn("Invalid user ID provided", { id: req.params.id });
            return res.status(404).json({ message: "Invalid userId" })
        }

        const user = await fetchUserByIdService(userId);

        if (!user) {
            logger.warn(`User not found by ID ${userId}`)
            return res.status(404).json({ message: `UserId ${userId} not found` })
        }

        logger.info(`UserId ${userId} found`)
        res.status(200).json(user)
    } catch (err: unknown) {
        logger.error("Error fetching user by ID", { error: err instanceof Error ? err.message : err, id: req.params.id });
        res.status(500).json({ message: err instanceof Error ? err.message : err})
    }
}

export const addToFavoriteRestaurants = async ( req: Request, res: Response) => {
    try {
        const { userId, restaurantId } = req.params;

        if (!userId || !restaurantId || Array.isArray(userId) || Array.isArray(restaurantId)) {
            logger.error("Invalid parameters for addToFavoriteRestaurants.")
            return res.status(400).json({ error: "Invalid parameters."})
        }

        const user = await addFavoriteRestaurantService(userId, restaurantId);
        logger.info(`Restaurant ${restaurantId} added to ${userId} favorites list`)
        res.status(200).json(user)
    } catch (err: unknown) {
        logger.error("addToFavoriteRestaurants controller error.", { error: err instanceof Error ? err.message : err }); 
        res.status(400).json({ message: err instanceof Error ? err.message: err})
    }
}

export const removeFromFavoriteRestaurants = async (req: Request, res: Response) => {
    try {
        const { userId, restaurantId } = req.params;

        if (!userId || !restaurantId || Array.isArray(userId) || Array.isArray(restaurantId)) {
            logger.error("Invalid parameters for removeFromFavoriteRestaurants.")
            return res.status(400).json({ error: "Invalid parameters."})
        }

        const user = await removeFavoriteRestaurantService(userId, restaurantId);
        logger.info(`Restaurant ${restaurantId} removed from ${userId} favorites list.`)
        res.status(200).json(user)
    } catch (err: unknown) {
        logger.error("removeFromFavoriteRestaurants controller error.", { error: err instanceof Error ? err.message : err }); 
        res.status(400).json({ message: err instanceof Error ? err.message: err})
    }
}