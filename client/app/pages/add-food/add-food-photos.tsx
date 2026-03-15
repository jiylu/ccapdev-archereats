import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { cn } from "../../lib/utils";

type Props = {
    restaurantData: any;
    setRestaurantData: React.Dispatch<React.SetStateAction<any>>;
    errors?: Record<string, string>;
};

export default function AddFoodPhotos({ restaurantData, setRestaurantData, errors }: Props) {
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Cleanup preview URLs on unmount
    useEffect(() => {
        return () => previews.forEach(url => URL.revokeObjectURL(url));
    }, [previews]);

    const handleFiles = (files: FileList | null) => {
        if (!files) return;

        const currentFiles: File[] = restaurantData.images || [];
        const totalAllowed = 6 - currentFiles.length;
        const newFiles: File[] = [];
        const newPreviews: string[] = [];

        for (let i = 0; i < files.length && i < totalAllowed; i++) {
            const file = files[i];
            newFiles.push(file);
            newPreviews.push(URL.createObjectURL(file));
        }

        setPreviews(prev => [...prev, ...newPreviews]);
        setRestaurantData({
            ...restaurantData,
            images: [...currentFiles, ...newFiles],
        });
    };

    const removePhoto = (index: number) => {
        const currentFiles: File[] = restaurantData.images || [];
        const newFiles = currentFiles.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);

        setPreviews(newPreviews);
        setRestaurantData({
            ...restaurantData,
            images: newFiles,
        });
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
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
                        onChange={e => handleFiles(e.target.files)}
                    />
                    <p className="text-gray-500">Click or drag & drop images here</p>
                    <p className="text-gray-400 text-sm mt-1">
                        {restaurantData.images?.length || 0}/6 uploaded
                    </p>
                </div>

                {errors?.images && (
                    <p className="text-sm text-red-500 mt-1">{errors.images}</p>
                )}

                {previews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                        {previews.map((url, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={url}
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