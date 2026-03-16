import { useMemo, useState } from "react";
import { Button } from "../../../components/ui/button";
import type { Post } from "../../../types/post";
import Comment from "../components/comment";
import { WriteReviewModal } from "../../../components/layout/review-modal";

interface ReviewSectionProps {
    reviews: Post[];
}

export default function ReviewSection(props: ReviewSectionProps) {
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [openReview, setOpenReview] = useState(false);
    
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

                <Button
                    className="bg-[#123524] text-white hover:bg-[#1f4d37]"
                    onClick={() => setOpenReview(true)}
                    >
                    Write a Review
                </Button>
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
        
            <WriteReviewModal
                restaurantId="demo-barn-id"
                open={openReview}
                onOpenChange={setOpenReview}
            />
        </>
    )

}