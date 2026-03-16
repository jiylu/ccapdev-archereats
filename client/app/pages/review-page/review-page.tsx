import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/ui/button";

import { Separator } from "../../components/ui/separator";
import Navbar from "../../components/layout/navbar";
import { Clock3, Facebook, MapPin, Phone } from "lucide-react";
import { WriteReviewModal } from "../../components/layout/review-modal";
import Comment from "./components/comment";
import type { Post } from "../../types/post";
import RestaurantOverview from "./components/restaurant-overview";
import HeroImage from "./components/hero-banner";
import type { Restaurant } from "../../types/restaurant";
import ReviewSection from "./ui/review-section";

const galleryPhotos = [
    "/the-barn-1.jpg",
    "/the-barn-2.jpg",
    "/the-barn-3.jpg",
    "/the-barn-4.jpg",
    "/the-barn-5.jpg",
];

const reviews: Post[] = [
    {
        _id: "1",
        userId: "69a99865c6edba9531e09a76",
        restaurantId: "69a932c633dab442a8b4bb15",
        rating: 4.3,
        content: "Amazing food and great ambiance! The pasta was cooked to perfection and the service was exceptional. Highly recommend the truffle pasta and the tiramisu for dessert. Will definitely come back!",
        likes: 12,
        pictures: [],
        replies: [],
        isAnonymous: true,
        ratePricing: "PP",
        waitTime: "15-30m",
        recommended: true,
        date: "2026-03-06T12:00:00.000+00:00"
    },
];

const barn: Restaurant = {
    _id: "12",
    restaurantName: "barn asdasd as sasad as",
    address: "ewanko",
    description: "asdsadsa",
    googleMapsLink: "googlemaps.com",
    images: galleryPhotos,
    avgRating: 4.3,
    amtRatings: 4,
    minPrice: 1,
    maxPrice: 200,
    tags: ["asd", "asdasd", "asdas"],
    openingHour: "10:00AM",
    closingHour: "12:00AM",
    mobileNumber: "09162574996",
    websites: ["asd.com", "youtube.com/123as1231"],
};

export default function ReviewPage() {
    useEffect(() => {
        document.title = "The Barn by Borro | ArcherEats";
    }, []);

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-12 pt-4 sm:px-6 lg:px-8">
                <HeroImage 
                    restaurantName="barn"
                    photos={barn.images}
                />
                
                <RestaurantOverview 
                    restaurant={barn} 
                />

                <ReviewSection 
                    reviews={reviews}
                />
            </main>
        </div>
    );
}
