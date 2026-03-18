import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import RestaurantCard from "../components/restaurant/restaurant-card";


//dummy data
interface Restaurant {
    _id: string,
    restaurantName: string,
    imageUrl: string,
    avgRating: number,
    amtRatings: number,
    tags: string[],
    minPrice: number,
    maxPrice: number,
    openingHour: string,
    closingHour: string
}

const eateries: Restaurant[] = [
    {
        _id: "1",
        restaurantName: "The Barn",
        imageUrl: "/img/the-barn.jpg",
        avgRating: 4.67,
        amtRatings: 120,
        tags: ["Bar", "Restaurant"],
        minPrice: 150,
        maxPrice: 450,
        openingHour: "10:00 AM",
        closingHour: "10:00 PM", 
    },
    {
        _id: "2",
        restaurantName: "Mang Inasal",
        imageUrl: "/img/mang-inasal.jpg",
        avgRating: 4.3,
        amtRatings: 210,
        tags: ["Filipino", "Grill"],
        minPrice: 100,
        maxPrice: 300,
        openingHour: "10:00 AM",
        closingHour: "9:00 PM",
    },
    {
        _id: "3",
        restaurantName: "Bench Café",
        imageUrl: "/img/bench-cafe.jpg",
        avgRating: 4.6,
        amtRatings: 95,
        tags: ["Café", "Snacks"],
        minPrice: 120,
        maxPrice: 350,
        openingHour: "8:00 AM",
        closingHour: "8:00 PM",
    },
    {
        _id: "4",
        restaurantName: "Hen Lin",
        imageUrl: "/img/hen-lin.jpg",
        avgRating: 4.4,
        amtRatings: 180,
        tags: ["Chinese", "Fast Food"],
        minPrice: 90,
        maxPrice: 280,
        openingHour: "9:00 AM",
        closingHour: "9:00 PM",
    }
]

export default function Landing () {
    
    return (
        <>
        <Navbar />
            <main>
                {/** Main Section Here */}
                <section className="relative h-[540px] overflow-hidden">
                    {/**Background Image Here */}
                    <img src="/building-noborder.jpeg" alt="Building" className="absolute inset-0 w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

                    <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24">
                        <h1 style={{ fontFamily: "Roboto, sans-serif", color: "beige"}} className="font-extrabold text-3xl md:text-5xl leading-tight max-w-xl drop-shadow-lg">
                            Discover and Experience DLSU's Diners through ArcherEats 
                        </h1>
                        <p className="font-['Roboto',sans-serif] mt-[20px] text-[12px] text-[#eeeeee] pt-[180px]">
                            Building <br />
                            nobodycallsmeclarke on Instagram
                        </p>
                    </div>
                </section>

                {/* Feature Section Here*/}
                <section className="bg-[#f5f0e8] px-8 md:px-16 py-10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                        <div className="w-16 h-[3px] bg-gray-800 mb-3" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            Featured Eateries around Taft
                        </h2>
                        </div>
                        <a
                        href="#"
                        className="text-sm text-gray-600 underline underline-offset-2 hover:text-gray-900 transition-colors"
                        >
                        See All
                        </a>
                    </div>

                    <div className="flex gap-5 overflow-x-auto mb-10 pb-4 scrollbar-hide">
                        {eateries.map((restaurant) => (
                        <div key={restaurant._id} className="shrink-0">
                            <RestaurantCard
                            _id={restaurant._id}
                            restaurantName={restaurant.restaurantName}
                            imageUrl={restaurant.imageUrl}
                            avgRating={restaurant.avgRating}
                            amtRatings={restaurant.amtRatings}
                            tags={restaurant.tags}
                            minPrice={restaurant.minPrice}
                            maxPrice={restaurant.maxPrice}
                            openingHour={restaurant.openingHour}
                            closingHour={restaurant.closingHour}
                            />
                        </div>
                        ))}
                    </div>
                </section>
            </main>
        <Footer />
        </>
    )
}