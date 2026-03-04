import { Request, Response } from "express";
import { IRestaurantInput } from "models/Restaurant.js";
import mongoose from "mongoose";
import { createRestaurantService, getAllRestaurantService, getRestaurantByIdService, getRestaurantByNameService } from "services/restaurant.service.js";

export const createRestaurant = async (req: Request<object, object, IRestaurantInput>, res: Response) => {
    try {
        const newRestaurant = await createRestaurantService(req.body);
        res.status(201).json(newRestaurant);
    } catch (err: unknown) {
        res.status(400).json({ message: err instanceof Error ? err.message: err})
    }
}

export const getAllRestaurants = async (req: Request, res: Response) => {
    try {
        const restaurants = await getAllRestaurantService()
        res.status(200).json(restaurants)
    } catch (err: unknown) {
        res.status(404).json({ message: err instanceof Error ? err.message : err})
    }
}   

export const getRestaurantById = async (req: Request<{id: string}>, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ message: "Invalid restaurant ID"})
    }
    
    try {
        const restaurant = await getRestaurantByIdService(req.params.id);
        
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" })
        }

        res.status(200).json(restaurant)
    } catch (err: unknown) {
        res.status(500).json({ message: err instanceof Error ? err.message : err})
    }
}

export const getRestaurantByName = async(req: Request<{name: string}>, res: Response) => {
    try {
        const restaurants = await getRestaurantByNameService(req.params.name) 

        if (restaurants.length === 0) {
            return res.status(404).json({ message: "Restaurant/s not found" })
        }

        res.status(200).json(restaurants)
    } catch (err: unknown) {
        res.status(500).json({ message: err instanceof Error ? err.message : err})
    }
}