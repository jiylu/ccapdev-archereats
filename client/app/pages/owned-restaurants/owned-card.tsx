import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import StarRating from "../../components/ui/star-rating";
import { Link, useNavigate } from "react-router-dom";
import type { Restaurant } from "app/types/restaurant";

interface OwnedCardProps {
    restaurant: Restaurant;
}

export default function OwnedCard({
    restaurant
}: OwnedCardProps) {
    const navigate = useNavigate();

    const handleManage = () => {
        navigate(`/manage-restaurant/${restaurant._id}`);
    };
    return (
        <Card className="w-[320px] pt-0 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
            <div className="relative h-[170px]">
                <img src={restaurant.images?.[0]} alt={restaurant.restaurantName} className="w-full h-full object-cover"/>

                <Button
                    size="sm"
                    onClick={handleManage}
                    className="absolute top-3 left-3 bg-[#006937] hover:bg-[#37833c] rounded-full"
                >
                    Manage
                </Button>
            </div>

            <CardContent className="pt-0 px-4 pb-4">
                <Link to={`/restaurant/${restaurant._id}`}>
                    <h3 className="text-xl font-bold text-[#123c2f]">
                        {restaurant.restaurantName}
                    </h3>

                    <div className="flex items-center gap-2 mt-2">
                        <StarRating rating={restaurant.avgRating} size={16} />
                        <span className="text-sm font-medium">
                            {restaurant.avgRating}
                        </span>
                    </div>

                    <p className="text-sm text-muted-foreground mt-2">
                        {restaurant.description}
                    </p>
                </Link>
            </CardContent>
        </Card>
    )
}