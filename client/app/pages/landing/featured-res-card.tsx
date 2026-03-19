import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedCardProps {
    restaurantId: string,
    restaurantName: string,
    rating: number,
    imgUrl: string,
}

export default function FeaturedRestaurantCard(props: FeaturedCardProps) {
    const linkTo = `/reviews/${props.restaurantId}`;


    return (
        <Link
            to={linkTo}
            className="block cursor-pointer relative group w-102 h-44 rounded-xl overflow-hidden shadow-md border border-white/60">
            
            <img
                src={props.imgUrl}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                alt={`${props.restaurantName} photo`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl" />

            <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <p className="text-white font-semibold text-sm leading-tight line-clamp-1 drop-shadow">
                    {props.restaurantName}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <Star size={11} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-white/80 text-[10px] font-medium">
                        {props.rating.toFixed(1)}
                    </span>
                </div>
            </div>
        </Link>
    )
}