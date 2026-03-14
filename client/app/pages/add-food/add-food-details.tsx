import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";

type Props = {
    restaurantData: any;
    setRestaurantData: React.Dispatch<React.SetStateAction<any>>;
    errors?: Record<string, string>;
}

export default function AddFoodDetails({ restaurantData, setRestaurantData, errors }: Props) {
    const updateField = (field: string, value: any) => {
        setRestaurantData({
            ...restaurantData,
            [field]: value
        });
    };

    const updateTag = (index: number, value: string) => {
        const newTags = [...restaurantData.tags];
        newTags[index] = value;

        setRestaurantData({
            ...restaurantData,
            tags: newTags
        });
    };

    const formatTime = (time: string) => {
        if (!time) return "";
        const [hourStr, minute] = time.split(":");
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
    };

    return (
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

            <Card className="rounded-2xl shadow-lg">
                <CardContent className="px-6 py-4 space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold text-[#123524]">
                            Food Establishment Tags *
                        </h2>
                        <p className="text-sm text-[#123524]">
                            Input your food establishment's tags
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-3">
                            {[0,1,2,3].map(i => (
                                <div key={i}>
                                    <Input
                                        placeholder={`Tag ${i+1}`}
                                        value={restaurantData.tags[i] || ""}
                                        onChange={(e) => updateTag(i, e.target.value)}
                                        className={cn(
                                            errors?.tags && !restaurantData.tags[i] && "border-red-500 focus-visible:ring-red-500"
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                        {errors?.tags && (
                            <p className="text-sm text-red-500 mt-1">{errors.tags}</p>
                        )}
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-[#123524] mt-4">
                            Price Range *
                        </h2>

                        <div className="grid grid-cols-2 gap-4 mt-3">
                            <div>
                                <Input
                                    placeholder="Min. Price"
                                    type="number"
                                    value={restaurantData.minPrice || ""}
                                    onChange={(e) => updateField('minPrice', Number(e.target.value))}
                                    className={cn(
                                        errors?.minPrice && "border-red-500 focus-visible:ring-red-500"
                                    )}
                                />
                                {errors?.minPrice && (
                                    <p className="text-sm text-red-500 mt-1">{errors.minPrice}</p>
                                )}
                            </div>
                            <div>
                                <Input
                                    placeholder="Max. Price"
                                    type="number"
                                    value={restaurantData.maxPrice || ""}
                                    onChange={(e) => updateField('maxPrice', Number(e.target.value))}
                                    className={cn(
                                        errors?.minPrice && "border-red-500 focus-visible:ring-red-500"
                                    )}
                                />
                                {errors?.minPrice && (
                                    <p className="text-sm text-red-500 mt-1">{errors.minPrice}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg">
                <CardContent className="px-6 py-4  space-y-10">
                    <div>
                        <h2 className="text-lg font-semibold text-[#123524]">
                            Food Establishment Location *
                        </h2>
                        <p className="text-sm text-[#123524]">
                            Pinpoint your food establishment's location
                        </p>
                        <Input
                            placeholder="Address"
                            className={cn(
                                "mt-3",
                                errors?.address && "border-red-500 focus-visible:ring-red-500"
                            )}
                            value={restaurantData.address || ""}
                            onChange={(e) => updateField('address', e.target.value)}
                        />
                        {errors?.address && (
                            <p className="text-sm text-red-500 mt-1">{errors.address}</p>
                        )}
                        
                        <Input
                            placeholder="Google Maps Link"
                            className={cn(
                                "mt-3",
                                errors?.googleMapsLink && "border-red-500 focus-visible:ring-red-500"
                            )}
                            value={restaurantData.googleMapsLink || ""}
                            onChange={(e) => updateField('googleMapsLink', e.target.value)}
                        />
                        {errors?.googleMapsLink && (
                            <p className="text-sm text-red-500 mt-1">{errors.googleMapsLink}</p>
                        )}
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-[#123524] mt-4">
                            Operating Hours *
                        </h2>

                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                                <Input
                                    type="time"
                                    placeholder="Opening Hour"
                                    value={restaurantData.openingHour || ""}
                                    onChange={(e) => updateField("openingHour", e.target.value)}
                                    className={cn(
                                        errors?.openingHour && "border-red-500 focus-visible:ring-red-500"
                                    )}
                                />
                                {errors?.openingHour && (
                                    <p className="text-sm text-red-500 mt-1">{errors.openingHour}</p>
                                )}
                            </div>
                            <div>
                                <Input
                                    type="time"
                                    placeholder="Closing Hour"
                                    value={restaurantData.closingHour || ""}
                                    onChange={(e) => updateField("closingHour", e.target.value)}
                                    className={cn(
                                        errors?.closingHour && "border-red-500 focus-visible:ring-red-500"
                                    )}
                                />
                                {errors?.closingHour && (
                                    <p className="text-sm text-red-500 mt-1">{errors.closingHour}</p>
                                )}
                            </div>
                        </div>

                        {restaurantData.openingHour && restaurantData.closingHour && (
                            <p className="text-sm text-gray-600 mt-1">
                                Display: {formatTime(restaurantData.openingHour)} - {formatTime(restaurantData.closingHour)}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}