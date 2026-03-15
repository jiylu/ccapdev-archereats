import Restaurant from "models/Restaurant.js";
import User, { IUserInput } from "../models/User.js";
import bcrypt from "bcrypt";

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

export const fetchUserByIdService = async(userId: string) => {
    return User.findById(userId);
}

export const addFavoriteRestaurantService = async (userId: string, restaurantId: string) => {
	const user = await User.findById(userId);
    
    if (!user) {
        throw new Error(`user.service Error finding userId`)
    }

    if (!await Restaurant.findOne({ _id: restaurantId })) {
        throw new Error(`user.service favoriteRestaurant Error finding restaurantId: ${restaurantId}`)
	}

    if (user?.favoriteRestaurants.includes(restaurantId)) {
        throw new Error(`Restaurant ${restaurantId} already in favorites list`);
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { favoriteRestaurants: restaurantId } },
        { new: true}
    )

    return updatedUser;
}

export const removeFavoriteRestaurantService = async (userId: string, restaurantId: string) => {
	const user = await User.findById(userId);

    if (!user) {
        throw new Error(`user.service Error finding userId`)
    }

    if (!await Restaurant.findOne({ _id: restaurantId })) {
        throw new Error(`user.service favoriteRestaurant Error finding restaurantId: ${restaurantId}`)
	}

    if (!user?.favoriteRestaurants.includes(restaurantId)) {
        throw new Error(`Restaurant ${restaurantId} not in favorites list.`);
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { favoriteRestaurants: restaurantId }},
        { new: true }
    )

    return updatedUser;
}