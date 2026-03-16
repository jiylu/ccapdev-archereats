import type { User } from "./user";

export interface Restaurant {
    _id?: string,
    restaurantName: string,
    address: string,
    description: string,
    googleMapsLink: string,
    images: (File | string)[],
    avgRating: number,
    amtRatings: number,
    tags: string[]
    minPrice: number,
    maxPrice: number,
    openingHour: string,
    closingHour: string,
    mobileNumber: string,
    websites: string[]
    owner: string;
}