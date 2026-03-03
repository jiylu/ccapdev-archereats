import Restaurant from "../models/Restaurant.js";

export const createRestaurantService = async (restaurantData) => {
    const { restaurantName, address, googleMapsLink, imgUrl, tags, minPrice, maxPrice, openingHour, closingHour } = restaurantData;

    const newRestaurant = await Restaurant.create({
        restaurantName,
        address,
        googleMapsLink,
        imgUrl,
        amtRatings: 0,
        tags: tags || [],
        minPrice,
        maxPrice,
        openingHour,
        closingHour
    });

    return newRestaurant;
}