import { Request, Response } from "express";
import { IRestaurantInput } from "models/Restaurant.js";
import mongoose from "mongoose";
import { createRestaurantSchema } from "schemas/restaurant.schemas.js";
import { createRestaurantService, getAllRestaurantService, getRestaurantByIdService, getRestaurantByNameService, getOwnedRestaurantsService, updateRestaurantService } from "services/restaurant.service.js";
import { logger } from "utils/logger.js"; 

export const createRestaurant = async (req: Request<object, object, IRestaurantInput>, res: Response) => {
    logger.info("POST /createRestaurant called", { body: req.body });

    try {
        const files = req.files as Express.Multer.File[] | undefined;
        // logger.info("req.files:", req.files);

        const validatedData = createRestaurantSchema.parse(req.body);
        const ownerId = (req as any).user?.id;
        
        // attach owner from auth middleware
        if (!ownerId) return res.status(401).json({ message: "User not authenticated" });

        const newRestaurant = await createRestaurantService({ ...validatedData, owner: ownerId }, files);
        logger.info(`Created ${newRestaurant._id} successfully.`);
        res.status(201).json(newRestaurant);
    } catch (err: unknown) {
        logger.error("Error creating new restaurant.", { error: err instanceof Error ? err.message : err }); 
        res.status(400).json({ message: err instanceof Error ? err.message : err });
    }
};

export const getAllRestaurants = async (req: Request, res: Response) => {
    logger.info("GET /getRestaurants called", {body: req.body})

    try {
        const restaurants = await getAllRestaurantService()
        logger.info("Fetched all restaurants successfully.", {
            count: restaurants.length, 
            restaurantNames: restaurants.map(r => r.restaurantName)
        })
        res.status(200).json(restaurants)
    } catch (err: unknown) {
        logger.error("Error fetching all restaurants.", { error: err instanceof Error ? err.message : err }); 
        res.status(404).json({ message: err instanceof Error ? err.message : err})
    }
}   

export const getRestaurantById = async (req: Request<{id: string}>, res: Response) => {
    logger.info(`GET /getRestaurantById called`, { id: req.params.id });

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    logger.warn("Invalid restaurant ID provided", { id: req.params.id });
        return res.status(404).json({ message: "Invalid restaurant ID"})
    }
    
    try {
        const restaurant = await getRestaurantByIdService(req.params.id);
        
        if (!restaurant) {
            logger.warn("Restaurant not found by ID", { id: req.params.id });
            return res.status(404).json({ message: "Restaurant not found" })
        }

        logger.info("Restaurant found", {restaurant: restaurant.restaurantName})
        res.status(200).json(restaurant)
    } catch (err: unknown) {
        logger.error("Error fetching restaurant by ID", { error: err instanceof Error ? err.message : err, id: req.params.id });
        res.status(500).json({ message: err instanceof Error ? err.message : err})
    }
}

export const getRestaurantByName = async(req: Request<{name: string}>, res: Response) => {
    logger.info("GET /getRestaurantByName called", { name: req.params.name });
    
    try {
        const restaurants = await getRestaurantByNameService(req.params.name) 

        if (restaurants.length === 0) {
            logger.warn("No restaurants found with given name", { name: req.params.name });
            return res.status(404).json({ message: "Restaurant/s not found" })
        }

        logger.info("Restaurants fetched by name successfully", { name: req.params.name, count: restaurants.length });
        res.status(200).json(restaurants)
    } catch (err: unknown) {
        logger.error("Error fetching restaurants by name", { error: err instanceof Error ? err.message : err, name: req.params.name });
        res.status(500).json({ message: err instanceof Error ? err.message : err})
    }
}

export const getOwnedRestaurants = async (req: Request, res: Response) => {
    logger.info("GET /ownedRestaurants called");

    try {
        const ownerId = (req as any).user?.id;

        if (!ownerId) {
            return res.status(401).json({ message: "User not authenticated"});
        }

        const restaurants = await getOwnedRestaurantsService(ownerId);
        res.status(200).json(restaurants);

    } catch (err: unknown) {
        logger.error("Error fetching owned restaurants", { error: err instanceof Error ? err.message : err });

        res.status(500).json({
            message: err instanceof Error ? err.message : err
        });
    }
}

export const updateRestaurant = async (req: Request<{ id: string }>, res: Response) => {
    logger.info("PUT /updateRestaurant/:id called", { id: req.params.id, body: req.body });

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        logger.warn("Invalid restaurant ID provided", { id: req.params.id });
        return res.status(404).json({ message: "Invalid restaurant ID" });
    }

    try {
        const ownerId = (req as any).user?.id;
        if (!ownerId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const files = req.files as Express.Multer.File[] | undefined;

        const updatedRestaurant = await updateRestaurantService(
            req.params.id,
            ownerId,
            req.body,
            files
        );

        if (!updatedRestaurant) {
            return res.status(404).json({ message: "Restaurant not found or unauthorized" });
        }

        logger.info("Restaurant updated successfully", { id: req.params.id });
        res.status(200).json(updatedRestaurant);
    } catch (err: unknown) {
        logger.error("Error updating restaurant", {
            error: err instanceof Error ? err.message : err,
            id: req.params.id
        });

        res.status(500).json({
            message: err instanceof Error ? err.message : err
        });
    }
};