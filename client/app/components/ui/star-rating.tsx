// StarRating.tsx
import { Star } from "lucide-react"; 

type StarRatingProps = {
    rating: number;
    size?: number; 
};

export default function StarRating({ rating, size = 20 }: StarRatingProps) {
    const safeRating = Math.max(0, Math.min(rating, 5));

    return (
        <div className="flex gap-0.5 items-center">
            {[1, 2, 3, 4, 5].map((i) => {
                const fillAmount = Math.max(0, Math.min(1, safeRating - i + 1));
                const fillPercentage = fillAmount * 100;

                return (
                    <div key={i} className="relative inline-block" style={{ width: size, height: size }}>
                        <Star size={size} className="text-gray-300 fill-gray-300 absolute top-0 left-0" />

                        <div className="absolute top-0 left-0 overflow-hidden h-full" style={{ width: `${fillPercentage}%` }}>
                            <Star size={size} className="text-yellow-400 fill-yellow-400" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}