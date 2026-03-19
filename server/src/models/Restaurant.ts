import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IRestaurantInput {
    owner: mongoose.Types.ObjectId;
    restaurantName: string;
    address: string;
    description: string;
    googleMapsLink: string;
    images?: string[];
    avgRating?: number;
    amtRatings?: number; 
    tags?: string[];     
    minPrice: number;
    maxPrice: number;
    openingHour: string;
    closingHour: string;
    mobileNumber: string;
    websites?: string[];
    isDeleted?: boolean;
}

export interface IRestaurant extends IRestaurantInput, Document {}

const restaurantSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    restaurantName: { type: String, required: true},
    address: { type: String, required: true},
    description: { type: String, required: true},
    googleMapsLink: { type: String, required: true},
    images: { type: [String], required: true},
    avgRating: { type: Number, required: true, default: 0},
    amtRatings: { type: Number, required: true, default: 0},
    tags: { type: [String], default: []},
    minPrice: { type: Number, required: true},
    maxPrice: { type: Number, required: true},
    openingHour: { type: String, required: true},
    closingHour: { type: String, required: true},
    mobileNumber: { type: String, required: true},
    websites: { type: [String], default: []},
    isDeleted: { type: Boolean, default: false },
}, {timestamps: true});

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);