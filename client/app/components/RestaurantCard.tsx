import { Button } from "./ui/button"
import StarRating from "./StarRating"
import TagList from "./TagList"

// type RestaurantCardProps = {
//     name : string,
//     imgURL : string,
//     imgAlt : string,
//     ratings : number,
//     amtRatings : number,
//     tags : string[]
//     pricing : string,
//     lowerBoundPrice : number,
//     upperBoundPrice : number,
//     openingHour : string,
//     closingHour : string, 
//     featuredReviews : [string?, string?, string?];
// }

export default function RestaurantCard({ url, resName, ratings, tags } : { url : string, resName : string, ratings : number, tags: string[]}) {
    return (
        <>
            <div className="flex w-[50vw] bg-white border border-gray-200 rounded-lg p-2 overflow-hidden">
                <div className="shrink w-[15vw] h-[32vh] mr-[1em]">
                    <img src={url} className="w-[15vw] h-[32vh] rounded-lg object-cover"/>
                </div>
                
                <div className="flex w-full flex-col pl-0.5 pr-0.5 gap-1">
                    {/* header */}
                    <div className="flex justify-between w-full">
                        <span className="font-bold text-3xl">{resName}</span>
                        <div className="flex gap-0.5">
                            <Button 
                                variant="outline" 
                                className="bg-[#1E4D36] text-white rounded-xl hover:bg-[#006937] hover:text-white  transition-colors duration-200">
                                Write a Review
                            </Button>  
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="inline-flex flex-row items-center">
                            <span className="mr-2 text-l font-medium leading-3.75">{ratings}</span>
                            <StarRating rating={ratings} size={15}/>
                        </div>

                        <TagList tags={tags}/>
                    </div>
                </div>
            </div>
        </>
    )
}