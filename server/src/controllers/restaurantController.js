import { createRestaurantService } from "../services/restaurantService.js";

export const createRestaurant = async (req,res) => {
    try {
        const newRestaurant = await createRestaurantService (req.body);
        res.status(201).json(newRestaurant);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}