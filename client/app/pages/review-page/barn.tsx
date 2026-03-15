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

interface Review {
    id: string;
    reviewerName: string;
    reviewDate: string;
    rating: number;
    helpfulCount: number;
    content: string;
}

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

const reviews: Review[] = [
    {
        id: "1",
        reviewerName: "Gaibril Gregorio",
        reviewDate: "January 28, 2026",
        rating: 5,
        helpfulCount: 12,
        content:
            "Amazing food and great ambiance! The pasta was cooked to perfection and the service was exceptional. Highly recommend the truffle pasta and the tiramisu for dessert. Will definitely come back!",
    },
    {
        id: "2",
        reviewerName: "Jeremy Leano",
        reviewDate: "January 25, 2026",
        rating: 4,
        helpfulCount: 8,
        content:
            "Good food and reasonable prices. The restaurant has a nice atmosphere and the staff is friendly. The only downside was the wait time during peak hours, but it was worth it.",
    },
    {
        id: "3",
        reviewerName: "Michael Maglente",
        reviewDate: "January 20, 2026",
        rating: 4,
        helpfulCount: 15,
        content:
            "Great place for family dinners! The portions are generous and the Filipino-Italian fusion dishes are unique and delicious. The adobo risotto is a must-try!",
    },
    {
        id: "4",
        reviewerName: "Diego Mejia",
        reviewDate: "January 15, 2026",
        rating: 5,
        helpfulCount: 20,
        content:
            "Outstanding experience from start to finish! The chef's special was incredible, and the wine pairing recommendations were spot on. Perfect for date nights or special occasions.",
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

export default function Barn() {
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
        <div className="flex min-h-screen flex-col bg-[#f7f8f7]">
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
                            <article
                                key={review.id}
                                className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="/default-avatar.svg"
                                            alt={`${review.reviewerName} avatar`}
                                            className="h-11 w-11 rounded-full border border-zinc-200"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-zinc-900">{review.reviewerName}</h3>
                                            <p className="text-xs text-zinc-500">{review.reviewDate}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <RatingStars value={review.rating} />
                                        <span className="font-semibold text-zinc-700">{review.rating.toFixed(1)}</span>
                                    </div>
                                </div>

                                <p className="mt-3 text-sm leading-relaxed text-zinc-700">{review.content}</p>

                                <div className="mt-4 flex gap-2">
                                    <Button variant="outline" className="border-zinc-300 bg-white">
                                        Helpful ({review.helpfulCount})
                                    </Button>
                                    <Button variant="outline" className="border-zinc-300 bg-white">
                                        Share
                                    </Button>
                                </div>
                            </article>
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
