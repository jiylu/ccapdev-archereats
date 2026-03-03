import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    restaurantName: { type: String, required: true},
    address: { type: String, required: true},
    googleMapsLink: { type: String, required: true},
    imgUrl: { type: String, required: true},
    amtRatings: { type: Number, required: true, default: 0},
    tags: { type: [String], default: []},
    minPrice: { type: Number, required: true},
    maxPrice: { type: Number, required: true},
    openingHour: { type: String, required: true},
    closingHour: { type: String, required: true},
}, {timeseries: true});

export default mongoose.model('Restaurant', restaurantSchema);