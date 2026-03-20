import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import AddFoodHeader from "./add-food-header";
import AddFoodDetails from "./add-food-details";
import AddFoodDesc from "./add-food-desc";
import AddFoodPhotos from "./add-food-photos";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import {
    uploadRestaurant,
    updateRestaurant,
    getRestaurantById,
} from "../../api/restaurant.api";
import type { Restaurant } from "../../types/restaurant";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";

export default function AddFood() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [saveChangesLoading, setSaveChangesLoading] = useState(false);

    const initialData: Restaurant = {
        restaurantName: "",
        address: "",
        description: "",
        googleMapsLink: "",
        images: [],
        tags: [],
        minPrice: 0,
        maxPrice: 0,
        openingHour: "",
        closingHour: "",
        mobileNumber: "",
        websites: [],
    };

    const [restaurantData, setRestaurantData] = useState<Restaurant>(initialData);

    useEffect(() => {
        document.title = isEditMode
            ? "Manage Food Establishment | ArcherEats"
            : "Add Food Establishment | ArcherEats";
    }, [isEditMode]);

    useEffect(() => {
        const fetchRestaurant = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const data = await getRestaurantById(id);
                setRestaurantData(data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load restaurant details.", { duration: 2000 });
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [id]);

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
        return Object.keys(newErrors).length === 0;
    };

    const formatTo12Hour = (time: string) => {
        if (!time) return "";
        if (time.includes("AM") || time.includes("PM")) return time;

        let [hour, minute] = time.split(":").map(Number);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;

        return `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")} ${ampm}`;
    };

    const handleReset = async () => {
        if (!isEditMode) {
            setRestaurantData(initialData);
            setErrors({});
            return;
        }

        if (!id) return;

        try {
            setLoading(true);
            const data = await getRestaurantById(id);
            setRestaurantData(data);
            setErrors({});
        } catch (err) {
            console.error(err);
            toast.error("Failed to reset restaurant details.", { duration: 2000 });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!validateFields()) {
            toast.error("Please fill in all required fields.", { duration: 2000 });
            return;
        }

        try {
            setSaveChangesLoading(true);

            if (isEditMode && id) {
                const updatePayload = {
                    ...restaurantData,
                    openingHour: formatTo12Hour(restaurantData.openingHour),
                    closingHour: formatTo12Hour(restaurantData.closingHour),
                };

                await updateRestaurant(id, updatePayload);
                toast.success("Restaurant updated successfully!", { duration: 2000 });
                navigate("/owned-restau");
            } else {
                const createPayload = {
                    restaurantName: restaurantData.restaurantName,
                    address: restaurantData.address,
                    description: restaurantData.description,
                    googleMapsLink: restaurantData.googleMapsLink,
                    images: restaurantData.images,
                    tags: restaurantData.tags,
                    minPrice: restaurantData.minPrice,
                    maxPrice: restaurantData.maxPrice,
                    openingHour: formatTo12Hour(restaurantData.openingHour),
                    closingHour: formatTo12Hour(restaurantData.closingHour),
                    mobileNumber: restaurantData.mobileNumber,
                    websites: restaurantData.websites,
                };

                await uploadRestaurant(createPayload);
                toast.success("Food Establishment added successfully!", { duration: 2000 });
                setRestaurantData(initialData);
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to save food establishment. Please try again.", { duration: 2000 });
        } finally {
            setSaveChangesLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fffcf5]">
                <Navbar />
                <div className="py-10 text-center text-[#123c2f] font-medium">
                    Loading restaurant details...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fffcf5]">
            <Navbar />

            <div className="py-10 space-y-6">
                <AddFoodHeader
                    restaurantData={restaurantData}
                    setRestaurantData={setRestaurantData}
                    checkRestaurantName={(name) => {
                        axios.get(`/restaurants/restaurantName/${name}`)
                            .then((res) => console.log("Found:", res.data))
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

                <div className="flex justify-center gap-4">
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={saveChangesLoading}
                        className="bg-[#22754d] hover:bg-[#32a970] text-white rounded-xl px-6 min-w-[140px] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {saveChangesLoading ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : isEditMode ? (
                            "Save Changes"
                        ) : (
                            "Save"
                        )}
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        disabled={saveChangesLoading}
                        className="text-[#123524] border-[#123524]/30 hover:bg-gray-100 rounded-xl px-6 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        Reset
                    </Button>
                </div>
            </div>
            <Footer />
        </div>
    );
}