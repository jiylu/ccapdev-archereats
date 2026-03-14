import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useRef, useState } from "react";

type Props = {
    restaurantData: any;
    setRestaurantData: React.Dispatch<React.SetStateAction<any>>;
};

export default function AddFoodPhotos({ restaurantData, setRestaurantData }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previews, setPreviews] = useState<string[]>([]);

    // Handle file selection
    const handleFiles = (files: FileList | null) => {
        if (!files) return;

        // Limit total images to 6
        const currentFiles = restaurantData.photos || [];
        const totalFiles = Math.min(currentFiles.length + files.length, 6);

        const newFiles: File[] = [];
        const newPreviews: string[] = [];

        for (let i = 0; i < files.length && currentFiles.length + i < 6; i++) {
            const file = files[i];
            newFiles.push(file);
            newPreviews.push(URL.createObjectURL(file));
        }

        setPreviews([...previews, ...newPreviews]);
        setRestaurantData({
            ...restaurantData,
            photos: [...currentFiles, ...newFiles],
        });
    };

    // Remove a photo
    const removePhoto = (index: number) => {
        const newPhotos = [...restaurantData.photos];
        const newPreviews = [...previews];

        newPhotos.splice(index, 1);
        newPreviews.splice(index, 1);

        setPreviews(newPreviews);
        setRestaurantData({ ...restaurantData, photos: newPhotos });
    };

    return (
        <Card className="max-w-5xl mx-auto rounded-2xl shadow-lg">
            <CardContent className="px-6 py-4  flex flex-col items-center space-y-4">
                <h2 className="text-lg font-semibold text-[#123524]">
                    Add Photos to showcase your Food Establishment *
                </h2>

                <p className="text-sm text-[#123524]">
                    Upload 1-6 photos.
                </p>

                {/* Hidden file input */}
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                />

                 {/* Upload Button */}
                <Button
                    className="bg-[#1f8f4a] hover:bg-[#16632a] text-white"
                    onClick={() => fileInputRef.current?.click()}
                >
                    Add Photos
                </Button>

                {/* Previews */}
                <div className="grid grid-cols-3 gap-4 mt-4 w-full">
                    {previews.map((src, index) => (
                        <div key={index} className="relative w-full h-36 rounded-xl overflow-hidden border">
                            <img
                                src={src}
                                alt={`preview-${index}`}
                                className="w-full h-full object-cover"
                            />
                            <Button
                                size="icon"
                                className="absolute top-1 right-1 rounded-full bg-red-500 hover:bg-red-700 text-white"
                                onClick={() => removePhoto(index)}
                            >
                                x
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}