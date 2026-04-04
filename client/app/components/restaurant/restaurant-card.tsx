import { toast } from "sonner"
import { Button } from "../ui/button"
import StarRating from "../ui/star-rating"
import TagList from "../ui/tag-list"
import { WriteReviewModal } from "../layout/review-modal"
import { LoginModal } from "../auth/login-modal"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth";
import { favoriteRestaurant, unfavoriteRestaurant } from "../../api/user.api"
import { Loader2 } from "lucide-react"

interface RestaurantCardProps {
    _id: string,
    restaurantOwner: string,
    restaurantName: string,
    imageUrl: string,
    avgRating: number,
    amtRatings: number,
    tags: string[],
    minPrice: number,
    maxPrice: number,
    openingHour: string,
    closingHour: string
}

export default function RestaurantCard(props: RestaurantCardProps) {
    const { user } = useAuth();
    const { setAuth } = useAuth();
    const [openReview, setOpenReview] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const [isFavoriteLoading, setFavoriteLoading] = useState(false);
    const isFavorited = user?.favoriteRestaurants?.includes(props._id) ?? false;

    const formatPriceRange = (maxPrice: number) => {
        if (maxPrice <= 200) return '₱';
        if (maxPrice <= 500) return '₱₱'

        return '₱₱₱'
    }

    const handleWriteReview = () => {
        if (!user) {
            setOpenLogin(true)
            return
        }
        setOpenReview(true)
    }

    const handleFavoriteRestaurant = async () => {
        if (!user) {
            setOpenLogin(true);
            return;
        }

        try {
            let newUser;
            setFavoriteLoading(true)
            
            if (isFavorited) {
                newUser = await unfavoriteRestaurant(user._id, props._id)

                toast.success(`${props.restaurantName} successfully removed from your favorites!`, {
                    duration: 1500
                })

                console.log(newUser.favoriteRestaurants)

            } else {
                newUser = await favoriteRestaurant(user._id, props._id);
                toast.success(`${props.restaurantName} successfully added to your favorites!`, {
                    duration: 1500
                })
            }

            setAuth(newUser);
        } catch (err: unknown) {
            toast.error("Failed to add restaurant to favorites.")
            console.error(err);
        } finally {
            setFavoriteLoading(false)
        }


    }

    const linkTo = `/reviews/${props._id}`;

    return (
        <div
            className="group relative flex max-w-130 max-h-60 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            id={props._id}
        >
            <Link to={linkTo} className="relative shrink-0 w-44 block overflow-hidden">
                <img
                    src={props.imageUrl}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    alt={`${props.restaurantName} photo`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 pointer-events-none" />
            </Link>

            <div className="flex flex-col justify-between flex-1 p-4 gap-2">

                <div>
                    <Link
                        to={linkTo}
                        className="font-semibold text-xl leading-tight text-gray-900 hover:text-emerald-700 transition-colors line-clamp-1"
                    >
                        {props.restaurantName}
                    </Link>

                    <div className="mt-1 flex items-center gap-1.5">
                        <StarRating rating={props.avgRating} size={13} />
                        <span className="text-sm text-gray-500 font-medium">
                            {props.avgRating.toFixed(1)}
                            <span className="text-gray-400 font-normal"> ({props.amtRatings})</span>
                        </span>
                    </div>
                </div>

                <TagList tags={props.tags} />

                <div className="flex flex-col gap-0.5 text-sm">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <span>{formatPriceRange(props.maxPrice)}</span>
                        <span className="text-gray-400 font-normal text-xs">·</span>
                        <span className="text-gray-500 font-normal">₱{props.minPrice}–₱{props.maxPrice}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
                        </svg>
                        <span className="text-gray-500">{props.openingHour} – {props.closingHour}</span>
                    </div>
                </div>

                <div className="flex gap-2 pt-1">
                    {props.restaurantOwner != user?._id ? (
                        <>
                            <Button
                                variant="outline"
                                className="flex-1 rounded-xl text-xs font-semibold border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all duration-200 active:scale-95"
                                onClick={handleWriteReview}
                            >
                                Write a Review
                            </Button>

                            <Button
                                variant="outline"
                                disabled={isFavoriteLoading}
                                className={`flex-1 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${
                                    isFavorited
                                        ? "border-rose-400 text-rose-500 hover:bg-rose-500 hover:text-white"
                                        : "border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white"
                                }`}
                                onClick={handleFavoriteRestaurant}
                            >
                                {isFavoriteLoading ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                    isFavorited ? "Unfavorite" : "Add to Favorites"
                                )}
                            </Button>
                        </>
                    ) : (
                        <Link to={`/manage-restaurant/${props._id}`} className="flex-1">
                            <Button
                                variant="outline"
                                className="w-full rounded-xl text-xs font-semibold border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all duration-200 active:scale-95"
                            >
                                Manage Restaurant
                            </Button>
                        </Link>
                    )}

                </div>
            </div>

            <WriteReviewModal
                restaurantId={props._id}
                open={openReview}
                onOpenChange={setOpenReview}
            />
            <LoginModal
                open={openLogin}
                onOpenChange={setOpenLogin}
                onLoginSuccess={() => {
                    setOpenLogin(false);
                    setOpenReview(true);
                }}
            />
        </div>
    )
}