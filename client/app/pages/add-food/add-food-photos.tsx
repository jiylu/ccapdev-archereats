import { useRef } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { cn } from "../../lib/utils";

type Props = {
    restaurantData: any;
    setRestaurantData: React.Dispatch<React.SetStateAction<any>>;
    errors?: Record<string, string>;
};

export default function AddFoodPhotos({ restaurantData, setRestaurantData, errors }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const images: (File | string)[] = restaurantData.images || [];

    const handleFiles = (files: FileList | null) => {
        if (!files) return;

        const totalAllowed = 6 - images.length;
        const newFiles: File[] = [];

        for (let i = 0; i < files.length && i < totalAllowed; i++) {
            newFiles.push(files[i]);
        }

        setRestaurantData({
            ...restaurantData,
            images: [...images, ...newFiles],
        });
    };

    const removePhoto = (index: number) => {
        const newImages = images.filter((_: File | string, i: number) => i !== index);

        setRestaurantData({
            ...restaurantData,
            images: newImages,
        });
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const getImageSrc = (image: File | string) => {
        if (typeof image === "string") return image;
        return URL.createObjectURL(image);
    };

    return (
        <Card className="rounded-2xl shadow-lg max-w-5xl mx-auto">
            <CardContent className="px-6 py-4 space-y-4">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-lg font-semibold text-[#123524]">
                        Upload Photos *
                    </h2>
                    <p className="text-sm text-[#123524] mt-1">
                        Add up to 6 photos of your food establishment
                    </p>
                </div>

                <div
                    className={cn(
                        "border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50",
                        errors?.images ? "border-red-500" : "border-gray-300"
                    )}
                    onClick={triggerFileSelect}
                >
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        ref={fileInputRef}
                        onChange={(e) => handleFiles(e.target.files)}
                    />
                    <p className="text-gray-500">Click or drag & drop images here</p>
                    <p className="text-gray-400 text-sm mt-1">
                        {images.length}/6 uploaded
                    </p>
                </div>

                {errors?.images && (
                    <p className="text-sm text-red-500 mt-1">{errors.images}</p>
                )}

                {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                        {images.map((image: File | string, index: number) => (
                            <div key={index} className="relative group">
                                <img
                                    src={getImageSrc(image)}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-32 sm:h-36 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => removePhoto(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}