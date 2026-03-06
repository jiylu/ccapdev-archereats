import { toast } from "sonner"
import { Button } from "../ui/button"
import StarRating from "../ui/star-rating"
import TagList from "../ui/tag-list"
import { WriteReviewModal } from "../layout/review-modal"

interface RestaurantCardProps {
    _id: string,
    restaurantName: string,
    imgUrl: string,
    avgRating: number,
    amtRatings: number,
    tags: string[],
    minPrice: number,
    maxPrice: number,
    openingHour: string,
    closingHour: string
}

export default function RestaurantCard(props : RestaurantCardProps) {
    const formatPriceRange = (maxPrice : number) => {
        if (maxPrice <= 200) return '₱';
        if (maxPrice <= 500) return '₱₱'

        return '₱₱₱'
    }
    
    return (
        <div className="flex max-w-120 bg-white border border-gray-200 rounded-lg p-2 overflow-hidden" id={props._id}>
            <div className="shrink w-60 h-50 mr-[1em]">
                <img src={props.imgUrl} className="w-60 h-50 rounded-lg object-cover" alt={props.restaurantName + " photo"}/>
            </div>
            
            <div className="flex w-full flex-col pl-0.5 pr-0.5 gap-1">
                <div className="flex justify-between w-full">
                    <span className="font-bold text-2xl">{props.restaurantName}</span>

                </div>

                <div className="flex flex-col gap-1.5">
                    <div className="inline-flex flex-row items-center">
                        <span className="mr-2 text-l font-medium leading-3.75">{props.avgRating} ({props.amtRatings})</span>
                        <StarRating rating={props.avgRating} size={15}/>
                    </div>
                    <TagList tags={props.tags}/>
                    <div className="flex gap-1.5">
                        <span className="text-emerald-900 font-bold">{formatPriceRange(props.maxPrice)}</span>
                        <span className="text-emerald-900 font-bold">(₱{props.minPrice} - ₱{props.maxPrice})</span>
                    </div>

                    <div className="mb-4">
                        <span className="font-medium">{props.openingHour} - {props.closingHour}</span>
                    </div>
                </div>


                <div className="flex gap-2 align-bottom">
                    <WriteReviewModal restaurantId={props._id} />
                    
                    <Button 
                        variant="outline" 
                        className="text-black rounded-xl border-[#006937] hover:bg-[#1E4D36] hover:text-white transition-colors duration-200"
                        onClick={() => toast.success(`${props.restaurantName} successfully added to your favorites!`, {
                            duration: 1500
                        })}
                    >
                        Add to Favorites
                    </Button>  
                </div>
            </div>
        </div>
    )
}