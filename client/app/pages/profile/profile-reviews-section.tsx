import { MessageSquareText } from "lucide-react";
import { getRestaurantById } from "../../api/restaurant.api"
import type { Post } from "../../types/post"
import ReviewCard from "./profile-review-card"
import { useEffect, useState } from "react";
import { Badge } from "../../components/ui/badge";

interface props {
    reviews: Post[]
}

export default function ProfileReviewsSection(props: props) {
    const [restaurantNames, setRestaurantNames] = useState<Record<string,string>>({});
    
    useEffect(() =>{
        const fetchNames = async () => {
            console.log("fetchNames API CALL!!")
            const entries = await Promise.all(
                props.reviews
                    .map(async (r) => {
                        const restaurant = await getRestaurantById(r.restaurant);
                        return [r.restaurant, restaurant.restaurantName]
                    })
            )

            setRestaurantNames(Object.fromEntries(entries))
    }

        fetchNames();
    }, [props.reviews])
    
    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-5">
                <h1 className="text-2xl font-bold text-[#123524] tracking-tight">Reviews</h1>
                <Badge className="text-xs font-semibold text-emerald-700 bg-emerald-50">
                    {props.reviews.length}
                </Badge>
            </div>

            {props.reviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
                    <MessageSquareText size={32} className="mb-2 opacity-40" />
                    <p className="text-sm">No reviews yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-2 items-start">
                    {props.reviews.map((r) => {
                        return (
                            <ReviewCard
                                key={r._id}
                                restaurantId={r.restaurant}
                                restaurantName={restaurantNames[r.restaurant]}
                                postRating={r.rating}
                                content={r.content}
                                date={r.creationDate}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    )
} 