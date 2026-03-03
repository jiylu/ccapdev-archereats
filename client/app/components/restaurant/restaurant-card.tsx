import { Button } from "../ui/button"
import StarRating from "../ui/star-rating"
import TagList from "../ui/tag-list"
import { Heart } from "lucide-react"

interface RestaurantCardProps {
    _id: string,
    name: string,
    imgURL: string,
    imgAlt: string,
    ratings: number,
    amtRatings: number,
    tags: string[]
    lowerBoundPrice: number,
    upperBoundPrice: number,
    openingHour: string,
    closingHour: string, 
    featuredReviews: string[];
}

export default function RestaurantCard(props : RestaurantCardProps ) {
    
    function determinePricing (upperBoundPrice : number) {
        if (upperBoundPrice <= 200) return '₱';
        if (upperBoundPrice <= 500) return '₱₱';
        
        return '₱₱₱';
    }
    
    return (
        <div className="flex w-200 bg-white border border-gray-200 rounded-lg p-2 overflow-hidden" id={props._id}>
            <div className="shrink w-60 h-50 mr-[1em]">
                <img src={props.imgURL} className="w-60 h-50 rounded-lg object-cover" alt={props.imgAlt}/>
            </div>
            
            <div className="flex w-full flex-col pl-0.5 pr-0.5 gap-1">
                <div className="flex justify-between w-full">
                    <span className="font-bold text-3xl">{props.name}</span>
                    <div className="flex gap-0.5">
                        <Button 
                            variant="outline" 
                            className="bg-[#1E4D36] text-white rounded-xl hover:bg-[#006937] hover:text-white  transition-colors duration-200">
                            Write a Review
                        </Button>  
                        <Button 
                            variant="outline" 
                            className="bg-[#1E4D36] text-white rounded-xl hover:bg-[#006937] hover:text-white  transition-colors duration-200">
                            <Heart />
                        </Button> 
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <div className="inline-flex flex-row items-center">
                        <span className="mr-2 text-l font-medium leading-3.75">{props.ratings} ({props.amtRatings})</span>
                        <StarRating rating={props.ratings} size={15}/>
                    </div>
                    <TagList tags={props.tags}/>
                    <div className="flex gap-1.5">
                        <span>{determinePricing(props.upperBoundPrice)}</span>
                        <span className="text-emerald-900 font-bold">(₱{props.lowerBoundPrice} - ₱{props.upperBoundPrice})</span>
                        <span>•</span>
                        <span>{props.openingHour} - {props.closingHour}</span>
                    </div>
                    <div className="flex flex-col italic">
                        {props.featuredReviews.map((review, index) => (
                            <span key={index}>"{review}"</span>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}