import { useMemo, useState } from "react";
import { Button } from "../../../components/ui/button";
import type { Post } from "../../../types/post";
import Comment from "./comment";
import { WriteReviewModal } from "../../../components/layout/review-modal";
import { useAuth } from "../../../hooks/useAuth";
import { LoginModal } from "../../../components/auth/login-modal";
import { toast } from "sonner";

interface ReviewSectionProps {
    restaurantId: string;
    owner: string;
    reviews: Post[];
}

export default function ReviewSection(props: ReviewSectionProps) {
    const { user, token } = useAuth();
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [openReview, setOpenReview] = useState(false);
    const [openLogin, setOpenLogin] = useState(false)
    
    const handleWriteReview = () => {
        console.log(props.restaurantId)
        console.log(`current userid: ${user?._id}`)
        console.log(`owner id: ${props.owner}`)
        if (!token) {
            setOpenLogin(true)
            return
        }

        setOpenReview(true)
    }

    const displayedReviews = useMemo(() => {
        if (showAllReviews) return props.reviews;

        return props.reviews.slice(0, 3);
    }, [showAllReviews, props.reviews]);

    return (
        <>
            <section className="mt-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-zinc-900">Customer Reviews</h2>
                    </div>

                    {user?._id !== props.owner ? (
                        <Button
                            className="bg-[#123524] text-white hover:bg-[#1f4d37]"
                            onClick={() => handleWriteReview()}
                        >
                            Write a Review
                        </Button>
                    ) : (
                        <span className="text-sm">You are the owner</span> 
                    )}  
                </div>

                <div className="mt-5 space-y-4">
                    {displayedReviews.map((review) => (
                        <Comment 
                        post={review}
                        />
                    ))}
                </div>

                <div className="mt-5 flex justify-center">
                    <Button
                        variant="outline"
                        className="border-emerald-700 text-emerald-800 hover:bg-emerald-50"
                        onClick={() => setShowAllReviews((prev) => !prev)}
                        >
                        {showAllReviews ? "Show Fewer Reviews" : "Load More Reviews"}
                    </Button>
                </div>
            </section>
            
            {user?._id !== props.owner && (
                <WriteReviewModal
                    restaurantId={props.restaurantId}
                    open={openReview}
                    onOpenChange={setOpenReview}
                />
            )}

            <LoginModal
                open={openLogin}
                onOpenChange={setOpenLogin}
                onLoginSuccess={() => {
                    setOpenLogin(false)
                    setOpenReview(true)
                }}
            />
        </>
    )

}