import type { User } from "../../types/user";
import type { Post } from "../../types/post";
import FavoritesSection from "./profile-favorites-section";
import ProfileReviewsSection from "./profile-reviews-section";

interface ProfileFooterProps {
    user: User;
    reviews: Post[]
}

export default function ProfileFooter(props: ProfileFooterProps) {
    
    return (
        <div className="flex w-full pl-30 mt-5 gap-10 justify-center">
            <div className="flex w-175">
                <ProfileReviewsSection 
                    reviews={props.reviews}
                />
            </div>

            <div className="flex w-auto">
                <FavoritesSection 
                    user={props.user}
                />
            </div>
        </div>
    )
}