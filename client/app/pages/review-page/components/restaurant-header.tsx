import StarRating from "../../../components/ui/star-rating";

interface RestaurantHeaderProps {
    restaurantName: string;
    avgRating: number;
    amtRatings: number;
    maxPrice: number;
    minPrice: number;
    tags: string[];
    openingHour: string;
    closingHour: string;
}

export default function RestaurantHeader(props: RestaurantHeaderProps) {
    const formatPriceRange = (maxPrice : number) => {
        if (maxPrice <= 200) return '₱';
        if (maxPrice <= 500) return '₱₱'

        return '₱₱₱'
    }

    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{props.restaurantName}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-zinc-600">
                <div className="flex items-center gap-2">
                    <StarRating rating={props.avgRating} size={10} />
                    <span className="font-medium text-zinc-800">{props.avgRating} ({props.amtRatings})</span>
                </div>
                <span>•</span>
                
                <span className="font-medium text-emerald-900">{formatPriceRange(props.maxPrice)} (Php {props.minPrice}-{props.maxPrice})</span>
                <span>•</span>
                
                <span>
                    {props.tags.map((tag, index) => (
                        <span key={index}>
                            {tag}
                            {index < props.tags.length - 1 && ", "}
                        </span>
                    ))}
                </span>

                <span>•</span>
                <div className="flex items-center gap-2">
                    <span>{props.openingHour} - {props.closingHour}</span>
                </div>
            </div>
        </div>
    )
}