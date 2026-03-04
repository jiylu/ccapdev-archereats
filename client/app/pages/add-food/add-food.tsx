import Navbar from "../../components/layout/navbar";
import AddFoodHeader from "./add-food-header";
import AddFoodDetails from "./add-food-details";
import AddFoodDesc from "./add-food-desc";
import AddFoodPhotos from "./add-food-photos";
import { useEffect } from "react";

export default function AddFood () {

    useEffect(() => {
        document.title="Add Food Establishment | ArcherEats";
    }, [])

    return (
        <div className="min-h-screen bg-[#fffcf5]">
            <Navbar />

            <div className="py-10 space-y-6">
                <AddFoodHeader />
                <AddFoodDetails />
                <AddFoodDesc />
                <AddFoodPhotos />
            </div>
        </div>
        
    )
}