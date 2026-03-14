import Restaurant from "models/Restaurant.js";
import User, { IUserInput } from "../models/User.js";
import bcrypt from "bcrypt";
import { logger } from "utils/logger.js";

export const createUserService = async (userData: IUserInput) => {
    if (await User.findOne({email: userData.email})) throw new Error("Email already exists.")
    if (await User.findOne({username: userData.username})) throw new Error("Username already exists.")

    const hashedPassword = await bcrypt.hash(userData.password, 10)
    
    const newUser = await User.create({
        ...userData,
        password: hashedPassword
    })
    
    return newUser 
};

export const addFavoriteRestaurantService = async (userId: string, restaurantId: string) => {
	const user = await User.findById(userId);
    
    if (!await Restaurant.findOne({ _id: restaurantId })) {
        throw new Error(`user.service favoriteRestaurant Error finding restaurantId: ${restaurantId}`)
	}

    if (!user) {
        throw new Error(`user.service Error finding userId`)
    }

    if (user?.favoriteRestaurants.includes(restaurantId)) {
        throw new Error(`Restaurant ${restaurantId} already in favorites list`);
    }

    await User.findByIdAndUpdate(
        userId,
        { $addToSet: { favoriteRestaurants: restaurantId } }
    )
}