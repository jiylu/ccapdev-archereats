export interface User {
    _id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    isStudent: boolean;
    biography?: string;
    avatar: string;
    favoriteRestaurants: string[]
}