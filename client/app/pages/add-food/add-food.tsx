import Navbar from "../../components/layout/navbar";
import AddFoodHeader from "./add-food-header";
import AddFoodDetails from "./add-food-details";
import AddFoodDesc from "./add-food-desc";
import AddFoodPhotos from "./add-food-photos";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AddFood () {

    const [restaurantData, setRestaurantData] = useState({
        restaurantName: "",
        address: "",
        description: "",
        googleMapsLink: "",
        images: [],
        avgRating: 0,
        amtRatings: 0,
        tags: [],
        minPrice: 0,
        maxPrice: 0,
        openingHour: "",
        closingHour: "",
        mobileNumber: "",
        websites: [],
    })

    useEffect(() => {
        document.title="Add Food Establishment | ArcherEats";
    }, [])

    const handleSubmit = async () => {
        try {
            const formData = new FormData();

            Object.entries(restaurantData).forEach(([key, val]) => {
                if (key === "images" && Array.isArray(val)) {
                    // Append each image File object
                    val.forEach((file) => formData.append("photos", file));
                } else if ((key === "tags" || key === "websites") && Array.isArray(val)) {
                    val.forEach((item) => formData.append(key, item));
                } else if (val !== undefined && val !== null) {
                    formData.append(key, val.toString());
                }
            });

            const res = await axios.post(
                "http://localhost:8080/api/restaurants/createRestaurant",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            console.log("Restaurant created:", res.data);
            alert("Food establishment added successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to create restaurant.");
        }
    };

    return (
        <div className="min-h-screen bg-[#fffcf5]">
            <Navbar />

            <div className="py-10 space-y-6">

                <AddFoodHeader 
                    restaurantData={restaurantData}
                    setRestaurantData={setRestaurantData}
                    checkRestaurantName={(name) => {
                        axios.get(`/restaurants/restaurantName/${name}`)
                            .then(res => console.log("Found:", res.data))
                            .catch(() => console.log("Not found"));
                    }}
                />

                <AddFoodDetails
                    restaurantData={restaurantData}
                    setRestaurantData={setRestaurantData}
                />

                <AddFoodDesc
                    restaurantData={restaurantData}
                    setRestaurantData={setRestaurantData}
                />

                <AddFoodPhotos
                    restaurantData={restaurantData}
                    setRestaurantData={setRestaurantData}
                />

                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white px-6 py-2 rounded-lg"
                    >
                        Add Establishment
                    </button>
                </div>

            </div>
        </div>
    );
}