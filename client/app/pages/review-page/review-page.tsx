import { useEffect, useMemo, useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog";
import { Separator } from "../../components/ui/separator";
import Navbar from "../../components/layout/navbar";
import { Clock3, Facebook, MapPin, Phone } from "lucide-react";
import { WriteReviewModal } from "../../components/layout/review-modal";
import Comment from "./comment/review-comment";
import type { Post } from "../../types/post";

const openingHours = [
    { day: "Monday", hours: "10:00 AM - 12:00 AM" },
    { day: "Tuesday", hours: "10:00 AM - 12:00 AM" },
    { day: "Wednesday", hours: "10:00 AM - 12:00 AM" },
    { day: "Thursday", hours: "10:00 AM - 12:00 AM" },
    { day: "Friday", hours: "10:00 AM - 12:00 AM" },
    { day: "Saturday", hours: "10:00 AM - 12:00 AM" },
    { day: "Sunday", hours: "10:00 AM - 12:00 AM" },
];

const galleryPhotos = [
    "/the-barn-2.jpg",
    "/the-barn-3.jpg",
    "/the-barn-4.jpg",
    "/the-barn-5.jpg",
];

const heroImage = "/the-barn-1.jpg";

const reviews: Post[] = [
    {
        _id: "1",
        userId: "69a99865c6edba9531e09a76",
        restaurantId: "69a932c633dab442a8b4bb15",
        rating: 4.3,
        content: "Amazing food and great ambiance! The pasta was cooked to perfection and the service was exceptional. Highly recommend the truffle pasta and the tiramisu for dessert. Will definitely come back!",
        likes: 12,
        pictures: [],
        replies: [],
        isAnonymous: true,
        ratePricing: "PP",
        waitTime: "15-30m",
        recommended: true,
        date: "2026-03-06T12:00:00.000+00:00"
    },
];

function RatingStars({ value }: { value: number }) {
    return (
        <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, index) => (
                <span key={`star-${value}-${index}`} className="text-base leading-none">
                    {index < value ? "★" : "☆"}
                </span>
            ))}
        </div>
    );
}

export default function ReviewPage() {
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [openReview, setOpenReview] = useState(false);

    useEffect(() => {
        document.title = "The Barn by Borro | ArcherEats";
    }, []);

    const displayedReviews = useMemo(() => {
        if (showAllReviews) return reviews;

        return reviews.slice(0, 3);
    }, [showAllReviews]);

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-12 pt-4 sm:px-6 lg:px-8">
                <section className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
                    <img
                        src={heroImage}
                        alt="The Barn by Borro hero"
                        className="h-[280px] w-full object-cover sm:h-[360px]"
                    />
                </section>

                <section className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                    {galleryPhotos.map((photo, index) => (
                        <img
                            key={photo}
                            src={photo}
                            alt={`The Barn by Borro gallery ${index + 1}`}
                            className="h-40 w-full rounded-xl object-cover shadow-sm"
                        />
                    ))}
                </section>

                <section className="mt-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">The Barn by Borro</h1>
                            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-zinc-600">
                                <div className="flex items-center gap-2">
                                    <RatingStars value={5} />
                                    <span className="font-medium text-zinc-800">4.5 (4 reviews)</span>
                                </div>
                                <span>•</span>
                                <span className="font-medium text-emerald-900">₱₱ (Php 150-500)</span>
                                <span>•</span>
                                <span>Casual Dining, International, Steak, Late Night, Alcoholic Drinks</span>
                                <span>•</span>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-emerald-700 text-white hover:bg-emerald-700">Open</Badge>
                                    <span>10:00 AM - 12:00 AM</span>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="link" className="h-auto p-0 text-emerald-800">
                                                See Hours
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-md rounded-xl">
                                            <DialogHeader>
                                                <DialogTitle>Opening Hours</DialogTitle>
                                            </DialogHeader>
                                            <div className="rounded-lg border border-zinc-200">
                                                {openingHours.map((item) => (
                                                    <div key={item.day} className="flex items-center justify-between px-4 py-2 text-sm">
                                                        <span className="font-medium text-zinc-700">{item.day}</span>
                                                        <span className="text-zinc-600">{item.hours}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid gap-3 text-sm text-zinc-700 md:grid-cols-2">
                            <div className="flex items-start gap-2">
                                <Phone className="mt-0.5 h-4 w-4 text-zinc-500" />
                                <span>
                                    <strong>Mobile:</strong> +63 995 109 4671
                                </span>
                            </div>

                            <a
                                href="https://www.facebook.com/barnMNL/"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-start gap-2 text-emerald-800 underline-offset-2 hover:underline"
                            >
                                <Facebook className="mt-0.5 h-4 w-4" />
                                <span>
                                    <strong>Facebook:</strong> The Barn by Borro
                                </span>
                            </a>

                            <a
                                href="https://maps.app.goo.gl/thFBhGwLck7KUPnc8"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-start gap-2 text-emerald-800 underline-offset-2 hover:underline md:col-span-2"
                            >
                                <MapPin className="mt-0.5 h-4 w-4" />
                                <span>
                                    <strong>Location:</strong> 2223 Fidel A. Reyes St. Malate, Manila City
                                </span>
                            </a>
                        </div>
                    </div>
                </section>

                <section className="mt-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-zinc-900">Customer Reviews</h2>
                            <div className="mt-1 flex items-center gap-2 text-sm text-zinc-600">
                                <Clock3 className="h-4 w-4" />
                                <span>4.5 out of 5</span>
                                <span>•</span>
                                <span>4 reviews</span>
                            </div>
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
                                _id={review._id}
                                userId={review.userId}
                                restaurantId={review.restaurantId}
                                rating={review.rating}
                                content={review.content}
                                likes={review.likes}
                                pictures={review.pictures}
                                replies={review.replies}
                                isAnonymous={review.isAnonymous}
                                ratePricing={review.ratePricing}
                                waitTime={review.waitTime}
                                recommended={review.recommended}
                                date={review.date}
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
            </main>
        </div>
    );
}
