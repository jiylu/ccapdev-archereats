import cloudinary from "config/cloudinary.js";
import Restaurant, { IRestaurant, IRestaurantInput } from "models/Restaurant.js";
import { logger } from "utils/logger.js";

export const createRestaurantService = async (
    restaurantData: IRestaurantInput,
    files?: Express.Multer.File[]
): Promise<IRestaurant> => {
    const imageUrls: string[] = [];

    if (files && files.length > 0) {
        for (const file of files) {
            logger.info("File found");

            const base64 = file.buffer.toString("base64");
            const dataUri = `data:${file.mimetype};base64,${base64}`;

            const result = await cloudinary.uploader.upload(dataUri, {
                folder: "restaurants",
                public_id: `restaurant-${Date.now()}-${Math.round(Math.random() * 1e9)}`
            });

            imageUrls.push(result.secure_url);
        }
    }

    const newRestaurant = await Restaurant.create({
        ...restaurantData,
        images: imageUrls,
        isDeleted: false
    });

    return await newRestaurant.save();
};

export const getAllRestaurantService = async () => {
    return await Restaurant.find({ isDeleted: false });
};

export const getRestaurantByIdService = async (id: string) => {
    return await Restaurant.findOne({ _id: id, isDeleted: false });
};

export const getRestaurantByNameService = async (name: string) => {
    return await Restaurant.find({
        restaurantName: { $regex: `^${name}$`, $options: "i" },
        isDeleted: false
    });
};

export const getOwnedRestaurantsService = async (ownerId: string) => {
    return await Restaurant.find({ owner: ownerId });
};

export const updateRestaurantService = async (
    restaurantId: string,
    ownerId: string,
    updateData: any,
    files?: Express.Multer.File[]
) => {
    const restaurant = await Restaurant.findOne({
        _id: restaurantId,
        owner: ownerId,
    });

    if (!restaurant) {
        return null;
    }

    const uploadedImageUrls: string[] = [];

    if (files && files.length > 0) {
        for (const file of files) {
            logger.info("Uploading updated restaurant image to Cloudinary");

            const base64 = file.buffer.toString("base64");
            const dataUri = `data:${file.mimetype};base64,${base64}`;

            const result = await cloudinary.uploader.upload(dataUri, {
                folder: "restaurants",
                public_id: `restaurant-${restaurantId}-${Date.now()}-${Math.round(Math.random() * 1e9)}`
            });

            uploadedImageUrls.push(result.secure_url);
        }
    }

    let existingImages: string[] = [];
    if (updateData.existingImages) {
        existingImages = Array.isArray(updateData.existingImages)
            ? updateData.existingImages
            : [updateData.existingImages];
    }

    restaurant.restaurantName = updateData.restaurantName ?? restaurant.restaurantName;
    restaurant.address = updateData.address ?? restaurant.address;
    restaurant.description = updateData.description ?? restaurant.description;
    restaurant.googleMapsLink = updateData.googleMapsLink ?? restaurant.googleMapsLink;
    restaurant.avgRating = updateData.avgRating ?? restaurant.avgRating;
    restaurant.amtRatings = updateData.amtRatings ?? restaurant.amtRatings;
    restaurant.minPrice = updateData.minPrice ?? restaurant.minPrice;
    restaurant.maxPrice = updateData.maxPrice ?? restaurant.maxPrice;
    restaurant.openingHour = updateData.openingHour ?? restaurant.openingHour;
    restaurant.closingHour = updateData.closingHour ?? restaurant.closingHour;
    restaurant.mobileNumber = updateData.mobileNumber ?? restaurant.mobileNumber;

    restaurant.tags = updateData.tags
        ? Array.isArray(updateData.tags)
            ? updateData.tags
            : [updateData.tags]
        : restaurant.tags;

    restaurant.websites = updateData.websites
        ? Array.isArray(updateData.websites)
            ? updateData.websites
            : [updateData.websites]
        : restaurant.websites;

    restaurant.images = [...existingImages, ...uploadedImageUrls];

    await restaurant.save();
    return restaurant;
};

export const deleteRestaurantService = async (
    restaurantId: string,
    ownerId: string
) => {
    const restaurant = await Restaurant.findOneAndUpdate(
        {
            _id: restaurantId,
            owner: ownerId,
            isDeleted: false
        },
        {
            isDeleted: true
        },
        {
            new: true
        }
    );

    return restaurant;
};

export const decrementRestaurantRating = async (
    id: string,
    removedRating: number
) => {
    const restaurant = await Restaurant.findOne({ _id: id, isDeleted: false });

    if (!restaurant) {
        throw new Error("decrementRestaurantRating service restaurant not found error.");
    }

    const oldCount = restaurant.amtRatings ?? 0;
    const oldAvg = restaurant.avgRating ?? 0;

    if (oldCount <= 1) {
        restaurant.amtRatings = 0;
        restaurant.avgRating = 0;
    } else {
        const newCount = oldCount - 1;
        const newAvg = ((oldAvg * oldCount) - removedRating) / newCount;

        restaurant.amtRatings = newCount;
        restaurant.avgRating = newAvg;
    }

    return await restaurant.save();
};

export const recalculateRestaurantRating = async (
    id: string,
    newRating: number,
    oldRating: number
) => {
    const restaurant = await Restaurant.findOne({ _id: id, isDeleted: false });

    if (!restaurant) {
        throw new Error("Restaurant not found.");
    }

    logger.info(`recalculating ${id} oldRating: ${oldRating} newRating: ${newRating}`);
    const count = restaurant.amtRatings ?? 0;
    const oldAvg = restaurant.avgRating ?? 0;

    if (count === 0) {
        throw new Error("No ratings to update.");
    }

    restaurant.avgRating = ((oldAvg * count) - oldRating + newRating) / count;
    logger.info(`recalculating ${id}`);

    return await restaurant.save();
};