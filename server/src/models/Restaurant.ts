import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IRestaurantInput {
    restaurantName: string;
    address: string;
    googleMapsLink: string;
    imgUrl: string;
    avgRating?: number;
    amtRatings?: number; 
    tags?: string[];     
    minPrice: number;
    maxPrice: number;
    openingHour: string;
    closingHour: string;
}

export interface IRestaurant extends IRestaurantInput, Document {}

const restaurantSchema = new mongoose.Schema({
    restaurantName: { type: String, required: true},
    address: { type: String, required: true},
    googleMapsLink: { type: String, required: true},
    imgUrl: { type: String, required: true},
    avgRating: { type: Number, required: true, default: 0},
    amtRatings: { type: Number, required: true, default: 0},
    tags: { type: [String], default: []},
    minPrice: { type: Number, required: true},
    maxPrice: { type: Number, required: true},
    openingHour: { type: String, required: true},
    closingHour: { type: String, required: true},
}, {timestamps: true});

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);