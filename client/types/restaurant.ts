export interface Restaurant {
    _id: string,
    restaurantName: string,
    imgUrl: string,
    avgRating: number,
    amtRatings: number,
    minPrice: number,
    maxPrice: number,
    openingHour: string,
    closingHour: string,
    tags: string[]
    featuredReviews : string[];
}