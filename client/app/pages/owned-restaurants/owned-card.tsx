import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import StarRating from "../../components/ui/star-rating";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Restaurant } from "app/types/restaurant";
import DeleteRestaurantAlert from "./delete-restaurant-alert";

interface OwnedCardProps {
    restaurant: Restaurant;
}

export default function OwnedCard({
    restaurant
}: OwnedCardProps) {
    const navigate = useNavigate();
    const [openDelete, setOpenDelete] = useState(false);

    const handleManage = () => {
        if (restaurant.isDeleted) return;
        navigate(`/manage-restaurant/${restaurant._id}`);
    };

    return (
        <>
            <Card className="w-[320px] pt-0 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="relative h-[170px]">
                    <img
                        src={restaurant.images?.[0]}
                        alt={restaurant.restaurantName}
                        className={`w-full h-full object-cover ${
                            restaurant.isDeleted ? "grayscale opacity-70" : ""
                        }`}
                    />

                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <Button
                            size="sm"
                            onClick={handleManage}
                            disabled={restaurant.isDeleted}
                            className="bg-[#006937] hover:bg-[#37833c] rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Manage
                        </Button>

                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setOpenDelete(true)}
                            className="rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={restaurant.isDeleted}
                        >
                            {restaurant.isDeleted ? "Deleted" : "Delete"}
                        </Button>
                    </div>

                    {restaurant.isDeleted && (
                        <div className="absolute top-3 right-3 rounded-full bg-red-600 text-white text-xs font-semibold px-3 py-1 shadow">
                            Deleted
                        </div>
                    )}
                </div>

                <CardContent className="pt-0 px-4 pb-4">
                    <Link
                        to={restaurant.isDeleted ? "#" : `/reviews/${restaurant._id}`}
                        onClick={(e) => {
                            if (restaurant.isDeleted) e.preventDefault();
                        }}
                        className={restaurant.isDeleted ? "pointer-events-none" : ""}
                    >
                        <h3 className="text-xl font-bold text-[#123c2f] mt-3">
                            {restaurant.restaurantName}
                        </h3>

                        {restaurant.isDeleted && (
                            <p className="text-sm font-medium text-red-600 mt-1">
                                This restaurant is deleted
                            </p>
                        )}

                        <div className="flex items-center gap-2 mt-2">
                            <StarRating rating={restaurant.avgRating ?? 0} size={16} />
                            <span className="text-sm font-medium">
                                {restaurant.avgRating ?? 0}
                            </span>
                        </div>

                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                            {restaurant.description}
                        </p>
                    </Link>
                </CardContent>
            </Card>

            <DeleteRestaurantAlert
                open={openDelete}
                onOpenChange={setOpenDelete}
                restaurantId={restaurant._id!}
            />
        </>
    );
}