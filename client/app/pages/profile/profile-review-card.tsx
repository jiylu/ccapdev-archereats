import StarRating from "../../components/ui/star-rating";

interface ReviewCardProps {
    restaurantName: string;
    postRating: number;
    content: string;
    date: string;
    restaurantId: string;
}

export default function ReviewCard(props: ReviewCardProps) {
    return (
        <div className="flex flex-col max-w-100 h-38 bg-[#f1f2ed] border border-gray-200 rounded-lg p-5">
            <span className="text-xl text-emerald-900 font-bold">
                {props.restaurantName}
            </span>
            <StarRating 
                size={20} 
                rating={3.5}
            />
            <p className="mt-2 text-base font-medium line-clamp-1">
                {props.content}
            </p>
            
            <span className="mt-auto text-gray-500 text-sm">
                {props.date}
            </span>
        </div>
    )
}