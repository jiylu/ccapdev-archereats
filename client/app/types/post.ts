export interface Post {
    _id: string;
    userId: string;
    restaurantId: string;
    rating: number;
    content: string;
    likes: number;
    pictures: string[];
    replies: string[];
    isAnonymous: boolean;
    ratePricing: string;
    waitTime: string;
    recommended: boolean;
    date: string;
}