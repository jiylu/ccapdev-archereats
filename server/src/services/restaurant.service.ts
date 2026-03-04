import Restaurant, { IRestaurant, IRestaurantInput } from "models/Restaurant.js";

export const createRestaurantService = async (restaurantData: IRestaurantInput) : Promise<IRestaurant> => {
    const newRestaurant = await Restaurant.create(restaurantData);
    return newRestaurant;
}