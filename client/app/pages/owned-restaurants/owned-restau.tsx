import Navbar from "../../components/layout/navbar";
import { useEffect, useState } from "react";
import OwnedCard from "./owned-card";
import { getOwnedRestaurants } from "../../api/restaurant.api";
import type { Restaurant } from "app/types/restaurant";


export default function OwnedRestaurants () {

    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        document.title = "Owned Restaurants | ArcherEats";

        const fetchOwnedRestaurants = async () => {
            try {
                const data = await getOwnedRestaurants();
                setRestaurants(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchOwnedRestaurants();
    }, []);

    return (
        <div className="min-h-screen bg-[#fffcf5]">
            <Navbar />

            <section className="px-6 md:px-24 py-12">
                <h1 className="text-4xl text-center font-bold text-[#123c2f] mb-4">Your Owned Restaurants</h1>
                <hr className="border-[#123c2f]"/>

                {/* Restaurants */}
                <div className="flex flex-wrap justify-center gap-8 mt-10">

                    {restaurants.length === 0 ? (
                        <p className="text-muted-foreground text-lg">
                            You don't own any restaurants yet.
                        </p>
                    ) : (
                        restaurants.map((restaurant) => (
                            <OwnedCard
                                key={restaurant._id}
                                _id={restaurant._id || ""}
                                name={restaurant.restaurantName}
                                image={restaurant.images?.[0]}
                                rating={restaurant.avgRating}
                                description={restaurant.description}
                            />
                        ))
                    )}

                </div>
            </section>
        </div>
    )
}