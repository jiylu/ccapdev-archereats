import type { Restaurant } from "../../../types/restaurant";
import { Separator } from "../../../components/ui/separator";
import { RestaurantContactInfo } from "./restaurant-contact";
import RestaurantHeader from "./restaurant-header";

interface RestaurantOverviewProps {
    restaurant: Restaurant;
}

export default function RestaurantOverview (props: RestaurantOverviewProps) {
    return (
        <section className="mt-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4">
                <RestaurantHeader 
                    restaurantName={props.restaurant.restaurantName}
                    avgRating={props.restaurant.avgRating}
                    amtRatings={props.restaurant.amtRatings}
                    maxPrice={props.restaurant.maxPrice}
                    minPrice={props.restaurant.minPrice}
                    tags={props.restaurant.tags}
                    openingHour={props.restaurant.openingHour}
                    closingHour={props.restaurant.closingHour}
                />
                <Separator />
                <RestaurantContactInfo 
                    mobileNumber={props.restaurant.mobileNumber}
                    websites={props.restaurant.websites}
                    googleMapsLink={props.restaurant.googleMapsLink}
                    address={props.restaurant.address}
                />
            </div>
        </section>
        )

}