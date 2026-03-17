import type { Post } from "../../types/post";
import ProfileReviewsSection from "./profile-reviews-section";

interface ProfileFooterProps {
    reviews: Post[]
}

export default function ProfileFooter(props: ProfileFooterProps) {
    
    return (
        <div className="flex w-full pl-30 mt-4">
            <div className="flex w-210">
                <ProfileReviewsSection 
                    reviews={props.reviews}
                />
            </div>

        </div>
    )
}