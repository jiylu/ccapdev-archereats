export interface Restaurant {
    _id: string,
    restaurantName: string,
    address: string,
    googleMapsLink: string,
    imgUrl: string,
    avgRating: number,
    amtRatings: number,
    tags: string[]
    minPrice: number,
    maxPrice: number,
    openingHour: string,
    closingHour: string,
}