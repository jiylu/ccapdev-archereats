import type { Restaurant } from "../../types/restaurant";
import FeaturedRestaurantCard from "./featured-res-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface FeaturedSectionProps {
    restaurants: Restaurant[]
}

export default function FeaturedSection (props: FeaturedSectionProps) {
    const ref = useRef(null);
    const [featuredRestaurants, setFeaturedRestaurants] = useState<Restaurant[]>([])
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.restaurants) return;

        const sorted = [...props.restaurants].sort((a, b) => {
            if (b.avgRating !== a.avgRating) return b.avgRating - a.avgRating;

            return b.amtRatings - a.amtRatings;
        });


        const timer = setTimeout(() => {
            setFeaturedRestaurants(sorted.slice(0, 9));
        });

        return () => clearTimeout(timer); 
    }, [props.restaurants]);

    return (
        <>
            <section ref={ref} className="bg-[#f5f0e8] px-8 md:px-16 py-10">
                <motion.div
                    className="flex items-center justify-between mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <div>
                        <motion.div
                            className="w-16 h-[3px] bg-gray-800 mb-3"
                            initial={{ scaleX: 0, originX: 0 }}
                            animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                        />
                        <h2 className="text-2xl font-bold text-gray-900">
                            Featured Eateries around Taft
                        </h2>
                    </div>

                    <button
                        onClick={() => navigate("/directory")}
                        className="text-sm text-gray-600 underline underline-offset-2 hover:text-gray-900 transition-colors"
                        >
                    See All
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
                >
                    <Carousel
                        opts={{ align: "start", dragFree: true, loop: true }}
                        className="w-full mb-10"
                    >
                        <CarouselContent className="-ml-4">
                            {featuredRestaurants.map((restaurant, index) => (
                                <motion.div
                                    key={restaurant._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.35 + index * 0.07,
                                        ease: "easeOut",
                                    }}
                                >
                                    <CarouselItem className="pl-4 basis-auto">
                                        <FeaturedRestaurantCard
                                            restaurantId={restaurant._id || "undefined"}
                                            restaurantName={restaurant.restaurantName}
                                            rating={restaurant.avgRating || 0}
                                            imgUrl={restaurant.images[0]}
                                        />
                                    </CarouselItem>
                                </motion.div>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-0" />
                        <CarouselNext className="right-0" />
                    </Carousel>
                </motion.div>
            </section>
        </>

    )

}