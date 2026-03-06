import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function AddFoodPhotos() {
    return (
        <Card className="max-w-5xl mx-auto rounded-2xl shadow-lg">
            <CardContent className="px-6 py-4  flex flex-col items-center space-y-4">
                <h2 className="text-lg font-semibold text-[#123524]">
                    Add Photos to showcase your Food Establishment *
                </h2>

                <p className="text-sm text-[#123524]">
                    Upload 1-6 photos.
                </p>

                <div className="relative w-[220px] h-[160px] border-2 border-dashed rounded-2xl flex items-center 
                justify-center bg-gray-50 hover:bg-gray-100 transition">
                    <span className="text-gray-500 font-medium">Add</span>
                    <Button size="icon" className="absolute bottom-3 right-3 rounded-full bg-[#1f8f4a] hover:bg-[#16632a]">
                        +</Button>
                </div>
            </CardContent>
        </Card>
    )
}