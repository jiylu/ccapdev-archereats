import { getRestaurantById } from "../../api/restaurant.api"
import type { Post } from "../../types/post"
import ReviewCard from "./profile-review-card"
import { useEffect, useState } from "react";

interface props {
    reviews: Post[]
}

export default function ProfileReviewsSection(props: props) {
    const [restaurantNames, setRestaurantNames] = useState<Record<string,string>>({});
    
    useEffect(() =>{
        const fetchNames = async () => {
            const entries = await Promise.all(
                props.reviews
                    .map(async (r) => {
                        console.log(r.restaurant)
                        const restaurant = await getRestaurantById(r.restaurant);
                        return [r.restaurant, restaurant.restaurantName]
                    })
            )

            setRestaurantNames(Object.fromEntries(entries))
    }

        fetchNames();
    }, [props.reviews])
    
    return (
        <div className="flex flex-col flex-1">
            <h1 className="text-3xl font-bold text-[#123524] mb-3">Reviews</h1>
            <div className="grid grid-cols-2 gap-3 items-start">
                {props.reviews.map((r) => (
                    <ReviewCard 
                        restaurantId={r._id}
                        restaurantName={restaurantNames[r.restaurant]}
                        postRating={r.rating}
                        content={r.content}
                        date={r.creationDate}
                    />
                ))}
            </div>
        </div>  
    )
} 