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
    return await Restaurant.findById(id);
}

export const getRestaurantByNameService = async (name: string) => {
    return await Restaurant.find({
        restaurantName: { $regex: `^${name}$`, $options: "i"} 
    })
}