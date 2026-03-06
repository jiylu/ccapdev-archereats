import Restaurant, { IRestaurant, IRestaurantInput } from "models/Restaurant.js";

export const createRestaurantService = async (restaurantData: IRestaurantInput) : Promise<IRestaurant> => {
    const newRestaurant = await Restaurant.create(restaurantData);
    return await newRestaurant.save();
}

export const getAllRestaurantService = async () => {
    return await Restaurant.find();
}

export const getRestaurantByIdService = async (id: string) => {
    return await Restaurant.findById(id);
}

export const getRestaurantByNameService = async (name: string) => {
    return await Restaurant.find({
        restaurantName: { $regex: `^${name}$`, $options: "i"} 
    })
}