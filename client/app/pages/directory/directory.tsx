import RestaurantCard from "../../components/restaurant/restaurant-card";
import Navbar from "../../components/layout/navbar";
import Filters from "./filters";

interface Restaurant {
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
    featuredReviews : string[];
}

const restaurants: Restaurant[] = [
    {
        _id: "1",
        name: "The Barn",
        imgURL: "https://static.where-e.com/Philippines/Metro_Manila/Malate/The-Barn_d37b8917af87015c57f0fe6e360d1b9d.jpg",
        imgAlt: "The Barn Picture",
        ratings: 4.9,
        amtRatings: 10,
        tags: ["Filipino","Casual Dining","Alcoholic Drinks"],
        lowerBoundPrice: 1,
        upperBoundPrice: 500,
        openingHour: "07:00AM",
        closingHour: "02:00AM",
        featuredReviews: ["The food was great!"]
    },
    {
        _id: "2",
        name: "La Toca",
        imgURL: "https://images.summitmedia-digital.com/spotph/images/2023/10/06/la-toca-taqueria-1-1696586016.jpeg",
        imgAlt: "La Toca Picture",
        ratings: 4.6,
        amtRatings: 12,
        tags: ["Mexican","Bar","Alcoholic Drinks"],
        lowerBoundPrice: 1,
        upperBoundPrice: 500,
        openingHour: "11:00AM",
        closingHour: "02:00AM",
        featuredReviews: ["The food was great!"]
    },
    {
        _id: "3",
        name: "Tinuhog ni Benny",
        imgURL: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/ae/2d/6d/caption.jpg?w=1100&h=1100&s=1",
        imgAlt: "Tinuhog ni Benny Picture",
        ratings: 4.3,
        amtRatings: 8,
        tags: ["Filipino","Casual Dining","Student Friendly"],
        lowerBoundPrice: 1,
        upperBoundPrice: 200,
        openingHour: "10:00AM",
        closingHour: "12:00AM",
        featuredReviews: ["The food was great!"]
    }
]

export default function Directory () {
    return (
        <>
        <Navbar />
        
        {/* page container */}
        <div className="flex justify-between">
            <Filters />
            <div className="flex flex-col items-center justify-center mt-1.5 gap-2">
                {restaurants.map((r) => (
                <RestaurantCard 
                    _id={r._id} 
                    name={r.name}
                    imgURL={r.imgURL}
                    imgAlt={r.imgAlt}
                    ratings={r.ratings}
                    amtRatings={r.amtRatings}
                    tags={r.tags}
                    lowerBoundPrice={r.lowerBoundPrice}
                    upperBoundPrice={r.upperBoundPrice}
                    openingHour={r.openingHour}
                    closingHour={r.closingHour}
                    featuredReviews={r.featuredReviews}
                />
                ))}
            </div>
            <Filters />
        </div>
        </>
    )
}