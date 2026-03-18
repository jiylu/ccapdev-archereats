import Restaurant from "models/Restaurant.js";
import User, { IUserInput } from "../models/User.js";
import bcrypt from "bcrypt";
import cloudinary from "config/cloudinary.js";
import { logger } from "utils/logger.js";

export const createUserService = async (userData: IUserInput) => {
    if (await User.findOne({ email: userData.email })) throw new Error("Email already exists.");
    if (await User.findOne({ username: userData.username })) throw new Error("Username already exists.");

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await User.create({
        ...userData,
        password: hashedPassword
    });

    return newUser;
};

export const fetchUserByIdService = async (userId: string) => {
    return User.findById(userId).select("-password");
};

export const addFavoriteRestaurantService = async (userId: string, restaurantId: string) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("user.service Error finding userId");
    }

    if (!await Restaurant.findOne({ _id: restaurantId })) {
        throw new Error(`user.service favoriteRestaurant Error finding restaurantId: ${restaurantId}`);
    }

    if (user.favoriteRestaurants.includes(restaurantId)) {
        throw new Error(`Restaurant ${restaurantId} already in favorites list`);
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { favoriteRestaurants: restaurantId } },
        { new: true }
    ).select("-password");

    return updatedUser;
};

export const removeFavoriteRestaurantService = async (userId: string, restaurantId: string) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("user.service Error finding userId");
    }

    if (!await Restaurant.findOne({ _id: restaurantId })) {
        throw new Error(`user.service favoriteRestaurant Error finding restaurantId: ${restaurantId}`);
    }

    if (!user.favoriteRestaurants.includes(restaurantId)) {
        throw new Error(`Restaurant ${restaurantId} not in favorites list.`);
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { favoriteRestaurants: restaurantId } },
        { new: true }
    ).select("-password");

    return updatedUser;
};

export const updateUserByIdService = async (
    userId: string,
    updateData: any,
    file?: Express.Multer.File
) => {
    const user = await User.findById(userId);

    if (!user) {
        return null;
    }

    if (updateData.username && updateData.username !== user.username) {
        const existingUser = await User.findOne({ username: updateData.username });
        if (existingUser) {
            throw new Error("Username already exists.");
        }
    }

    user.username = updateData.username ?? user.username;
    user.firstName = updateData.firstName ?? user.firstName;
    user.lastName = updateData.lastName ?? user.lastName;
    user.biography = updateData.biography ?? user.biography;

    if (typeof updateData.isStudent !== "undefined") {
        user.isStudent = updateData.isStudent === "true" || updateData.isStudent === true;
    }

    if (file) {
        const base64 = file.buffer.toString("base64");
        const dataUri = `data:${file.mimetype};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataUri, {
            folder: "users/avatars",
            public_id: `user-avatar-${userId}-${Date.now()}-${Math.round(Math.random() * 1e9)}`
        });

        user.avatar = result.secure_url;
    }

    await user.save();

    const safeUser = await User.findById(userId).select("-password");
    return safeUser;
};

export const checkUsernameAvailabilityService = async (username: string) => {
    const existingUser = await User.findOne({ username });
    return !existingUser;
}

export const fecthUserByUsernameService = async (username: string) => {
    const user = await User.findOne({ username }).select("-password")

    if (!user) throw new Error("Username doesnt exist");

    return user;
}