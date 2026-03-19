import { Link } from "react-router-dom";
import StarRating from "../../components/ui/star-rating";

interface ReviewCardProps {
    restaurantName: string;
    postRating: number;
    content: string;
    date: string;
    restaurantId: string;
}

export default function ReviewCard(props: ReviewCardProps) {
    const linkTo = `/reviews/${props.restaurantId}`;

    return (
        <Link 
            className="flex flex-col w-85 h-38 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
            to={linkTo}
        >
            <div className="flex items-start justify-between gap-5">
                <span className="text-base text-emerald-900 font-bold leading-tight truncate">
                    {props.restaurantName}
                </span>
                <StarRating size={16} rating={props.postRating} />
            </div>

            <p className="mt-2 text-sm text-gray-600 font-medium line-clamp-2 leading-relaxed">
                {props.content}
            </p>

            <span className="mt-auto text-xs text-gray-400 tracking-wide">
                {new Date(props.date).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </span>
        </Link>
    )
}