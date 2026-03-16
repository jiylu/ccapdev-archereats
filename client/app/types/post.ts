export interface Post {
    _id: string;
    user: string;
    restaurant: string;
    rating: number;
    content: string;
    likes: number;
    pictures: string[];
    replies: string[];
    isAnonymous: boolean;
    ratePricing: string;
    waitTime: string;
    recommended: boolean;
    creationDate: string;
}