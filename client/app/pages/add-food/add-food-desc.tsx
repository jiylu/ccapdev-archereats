import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { cn } from "../../lib/utils";

type Props = {
    restaurantData: any;
    setRestaurantData: React.Dispatch<React.SetStateAction<any>>;
    errors?: Record<string, string>;
}

export default function AddFoodDesc({ restaurantData, setRestaurantData, errors }: Props) {
    const updateField = (field: string, value: any) => {
        setRestaurantData({
            ...restaurantData,
            [field]: value
        });
    };

    const updateWebsite = (index: number, value: string) => {
        const newWebsites = [...restaurantData.websites];
        newWebsites[index] = value;

        setRestaurantData({
            ...restaurantData,
            websites: newWebsites
        });
    };

    return (
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            <Card className="rounded-2xl shadow-lg">
                <CardContent className="px-6 py-4  space-y-4">
                    <h2 className="text-lg font-semibold text-[#123524]">
                        Description *
                    </h2>
                    <p className="text-sm text-[#123524]">
                        Write a short description about your food establishment.
                    </p>
                    <Textarea
                        placeholder="Description..."
                        className={cn(
                            "min-h-[100px]",
                            errors?.description && "border-red-500 focus-visible:ring-red-500"
                        )}
                        value={restaurantData.description}
                        onChange={(e) => updateField("description", e.target.value)}
                    />
                    {errors?.description && (
                        <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                    )}
                </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg">
                <CardContent className="px-6 py-4  space-y-4">
                    <h2 className="text-lg font-semibold text-[#123524]">
                        Contact Information *
                    </h2>
                    <p className="text-sm text-[#123524]">
                        Input how customers can contact your food establishment.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Input
                                placeholder="Mobile Number"
                                value={restaurantData.mobileNumber}
                                onChange={(e) =>
                                    updateField("mobileNumber", e.target.value)
                                }
                                className={cn(
                                    errors?.mobileNumber && "border-red-500 focus-visible:ring-red-500"
                                )}
                            />
                            {errors?.mobileNumber && (
                                <p className="text-sm text-red-500 mt-1">{errors.mobileNumber}</p>
                            )}
                        </div>

                        {[0, 1, 2].map(i => (
                            <div key={i}>
                                <Input
                                    placeholder={`Website ${i + 1} URL`}
                                    value={restaurantData.websites[i] || ""}
                                    onChange={(e) => updateWebsite(i, e.target.value)}
                                    className={cn(
                                        errors?.websites && !restaurantData.websites[i] && "border-red-500 focus-visible:ring-red-500"
                                    )}
                                />
                            </div>
                        ))}
                        {errors?.websites && (
                            <p className="text-sm text-red-500 mt-1 col-span-2">{errors.websites}</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
