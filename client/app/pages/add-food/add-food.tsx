import Navbar from "../../components/layout/navbar";
import AddFoodHeader from "./add-food-header";
import AddFoodDetails from "./add-food-details";
import AddFoodDesc from "./add-food-desc";
import AddFoodPhotos from "./add-food-photos";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { uploadRestaurant } from "../../api/restaurant.api";
import type { Restaurant } from "../../types/restaurant";


export default function AddFood () {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const initialData: Restaurant = {
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
    };
    
    const [restaurantData, setRestaurantData] = useState(initialData);

    useEffect(() => {
        document.title="Add Food Establishment | ArcherEats";
    }, [])


    const validateFields = () => {
        const newErrors: Record<string, string> = {};

        if (!restaurantData.restaurantName.trim()) newErrors.restaurantName = "Restaurant name is required.";
        if (!restaurantData.address.trim()) newErrors.address = "Address is required.";
        if (!restaurantData.description.trim()) newErrors.description = "Description is required.";
        if (!restaurantData.googleMapsLink.trim()) newErrors.googleMapsLink = "Google Maps link is required.";
        if (!restaurantData.tags || restaurantData.tags.length === 0) newErrors.tags = "At least one tag is required.";
        if (!restaurantData.images || restaurantData.images.length === 0) newErrors.images = "Upload at least one photo.";
        if (!restaurantData.minPrice) newErrors.minPrice = "Minimum price is required.";
        if (!restaurantData.maxPrice) newErrors.maxPrice = "Maximum price is required.";
        if (!restaurantData.openingHour) newErrors.openingHour = "Opening hour is required.";
        if (!restaurantData.closingHour) newErrors.closingHour = "Closing hour is required.";
        if (!restaurantData.mobileNumber.trim()) newErrors.mobileNumber = "Mobile number is required.";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // true if no errors
    };

    const formatTo12Hour = (time: string) => {
        if (!time) return "";
        let [hour, minute] = time.split(":").map(Number);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2,"0")} ${ampm}`;
    };

    const handleReset = () => {
        setRestaurantData(initialData);
    };

    const handleSubmit = async () => {
        if (!validateFields()) {
            toast.error("Please fill in all required fields.", { duration: 2000 });
            return; 
        }

        try {
            const payload = {
                ...restaurantData,
                openingHour: formatTo12Hour(restaurantData.openingHour),
                closingHour: formatTo12Hour(restaurantData.closingHour),
            };

            uploadRestaurant(payload);
            alert("Food establishment added successfully!");
            toast.success("Food Establishment added successfully!", { duration: 2000 });

            setRestaurantData(initialData);
            navigate("/");
        } catch (err) {
            console.error(err);
            toast.error("Failed to add food establishment. Please try again.", { duration: 2000 })
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
                    errors={errors}
                />

                <AddFoodDetails
                    restaurantData={restaurantData}
                    setRestaurantData={setRestaurantData}
                    errors={errors}
                />

                <AddFoodDesc
                    restaurantData={restaurantData}
                    setRestaurantData={setRestaurantData}
                    errors={errors}
                />

                <AddFoodPhotos
                    restaurantData={restaurantData}
                    setRestaurantData={setRestaurantData}
                    errors={errors}
                />

                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-[#00b25d] hover:bg-[#0e2a1d] text-white px-6 py-2 rounded-lg"
                    >
                        Add Establishment
                    </button>
                    <button
                        onClick={handleReset}
                        className="border border-[#123524]/30 text-[#123524] hover:bg-gray-100 px-6 py-2 rounded-lg ml-4 transition-colors duration-200"
                    >
                        Reset
                    </button>
                </div>
                
            </div>
        </div>
    );
}