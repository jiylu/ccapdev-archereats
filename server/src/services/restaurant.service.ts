import cloudinary from "config/cloudinary.js";
import Restaurant, { IRestaurant, IRestaurantInput } from "models/Restaurant.js";
import { logger } from "utils/logger.js";

export const createRestaurantService = async (restaurantData: IRestaurantInput, files?: Express.Multer.File[]) : Promise<IRestaurant> => {
    const imageUrls: string[] = []

    if (files && files.length > 0) {
        for (const file of files) {
            logger.info("File found");
            const base64 = file.buffer.toString("base64");
            const dataUri = `data:${file.mimetype};base64,${base64}`

            const result = await cloudinary.uploader.upload(dataUri, {
                folder: "restaurants",
                public_id: file.originalname.split(".")[0]
            })

            imageUrls.push(result.secure_url)
        }
    }
    
    const newRestaurant = await Restaurant.create({
        ...restaurantData,
        images: imageUrls
    });

    return await newRestaurant.save();
}

export const getAllRestaurantService = async () => {
    return await Restaurant.find();
}

export const getRestaurantByIdService = async (id: string) => {
    return await Restaurant.findById(id).populate('owner', '_id name');
}

export const getRestaurantByNameService = async (name: string) => {
    return await Restaurant.find({
        restaurantName: { $regex: `^${name}$`, $options: "i"} 
    })
}

export const getOwnedRestaurantsService = async (ownerId: string) => {
    return await Restaurant.find({owner: ownerId});
}

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

    const uploadedImagePaths = files?.map((file) => file.path) || [];

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

    restaurant.images = [...existingImages, ...uploadedImagePaths];

    await restaurant.save();
    return restaurant;
};