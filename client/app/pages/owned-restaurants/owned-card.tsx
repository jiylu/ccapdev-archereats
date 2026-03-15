import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import StarRating from "../../components/ui/star-rating";
import { Link } from "react-router-dom";

interface OwnedCardProps {
    _id: string;
    name: string;
    image: string;
    rating: number;
    description: string;
}

export default function OwnedCard({
    _id,
    name,
    image,
    rating,
    description
}: OwnedCardProps) {
    return (
        <Card className="w-[320px] pt-0 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
            <div className="relative h-[170px]">
                <img src={image} alt={name} className="w-full h-full object-cover"/>

                <Button
                    size="sm"
                    className="absolute top-3 left-3 bg-[#006937] hover:bg-[#37833c] rounded-full"
                >
                    Manage
                </Button>
            </div>

            <CardContent className="pt-0 px-4 pb-4">
                <Link to={`/restaurant/${_id}`}>
                    <h3 className="text-xl font-bold text-[#123c2f]">
                        {name}
                    </h3>

                    <div className="flex items-center gap-2 mt-2">
                        <StarRating rating={rating} size={16} />
                        <span className="text-sm font-medium">
                            {rating}
                        </span>
                    </div>

                    <p className="text-sm text-muted-foreground mt-2">
                        {description}
                    </p>
                </Link>
            </CardContent>
        </Card>
    )
}