import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";

type Props = {
    restaurantData: any;
    setRestaurantData: React.Dispatch<React.SetStateAction<any>>;
    checkRestaurantName?: (name: string) => void;
    errors?: Record<string, string>;
};

export default function AddFoodHeader ({ restaurantData, setRestaurantData, checkRestaurantName, errors }: Props) {
    
    const updateField = (field: string, value: any) => {
        setRestaurantData({
            ...restaurantData,
            [field]: value
        });
    };
    
    return (
        <Card className="max-w-5xl mx-auto rounded-2xl shadow-lg">
            <CardContent className="px-6 py-4 space-y-4">
                <h1 className="text-2xl font-bold text-[#123524]">
                    Add/Edit Food Establishment
                </h1>
                <p className="text-[#123524]">
                    Before adding this food establishment, please ensure the
                    food establishment is not already listed in the website.
                </p>

                <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-[#123524]">
                        Food Establishment Full Name*
                    </h2>
                    <p className="text-sm text-[#123524]">
                        Customize and check if your food establishment is in the website.
                    </p>

                    <div className="flex gap-3 mt-4">
                        <Input
                            placeholder="The Barn By Borro"
                            className={cn(
                                "rounded-xl w-1/2",
                                errors?.restaurantName && "border-red-500 focus-visible:ring-red-500"
                            )}
                            value={restaurantData.restaurantName}
                            onChange={(e) => updateField("restaurantName", e.target.value)}
                        />
                        <Button
                            className="bg-[#00b25d] hover:bg-[#0e2a1d] ml-2"
                            onClick={() => checkRestaurantName && checkRestaurantName(restaurantData.restaurantName)}
                        >
                            Check
                        </Button>
                    </div>
                    {errors?.restaurantName && (
                        <p className="text-sm text-red-500 mt-1">{errors.restaurantName}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}