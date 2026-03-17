import { useEffect, useState } from "react";

import Navbar from "../../components/layout/navbar";
import type { Post } from "../../types/post";
import RestaurantOverview from "./components/restaurant-overview";
import HeroImage from "./components/hero-banner";
import type { Restaurant } from "../../types/restaurant";
import ReviewSection from "./components/review-section";
import { useParams } from "react-router-dom";
import { getRestaurantById } from "../../api/restaurant.api";
import { findRestaurantPosts } from "../../api/post.api";
import PageLoader from "../../components/ui/loading";

export default function ReviewPage() {
    const { id } = useParams<{ id: string }>();
    const [restaurant, setRestaurant] = useState<Restaurant>();
    const [reviews, setReviews] = useState<Post[]>([]);
    const [imgUrls, setImgUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchRestaurant = async () => {
            if (!id) return 

            try {
                const [restaurantData, postsData] = await Promise.all([
                    getRestaurantById(id),
                    findRestaurantPosts(id),
                ]);

                if (!restaurantData) return;

                const imgUrls = restaurantData.images.
                            filter((img): img is string => typeof img === "string")

                setImgUrls(imgUrls);
                setRestaurant(restaurantData);
                setReviews(postsData)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
            document.title = `${restaurant?.restaurantName} | ArcherEats`;
        }

        fetchRestaurant();
    }, [id, restaurant?.restaurantName]);

    if (loading) return <PageLoader />;

    if (!restaurant || !id) {
        return <div>Restaurant not found</div>;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-12 pt-4 sm:px-6 lg:px-8">
            <HeroImage 
                    restaurantName="barn"
                    photos={imgUrls}
                />
                
                <RestaurantOverview 
                    restaurant={restaurant} 
                />

                <ReviewSection 
                    restaurantId={id}
                    owner={restaurant.owner}
                    reviews={reviews}
                />
            </main>
        </div>
    );
}
