import { Request, Response } from "express";
import { IRestaurantInput } from "models/Restaurant.js";
import { createRestaurantService } from "services/restaurant.service.js";

export const createRestaurant = async (req: Request<object, object, IRestaurantInput>, res: Response) => {
    try {
        const newRestaurant = await createRestaurantService(req.body);
        res.status(201).json(newRestaurant);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: err });
        }
    }
}