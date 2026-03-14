import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

type Props = {
    restaurantData: any;
    setRestaurantData: React.Dispatch<React.SetStateAction<any>>;
}

export default function AddFoodDesc({ restaurantData, setRestaurantData }: Props) {
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
                    <Textarea placeholder="Description..." className="min-h-[100px]"
                        value={restaurantData.description}
                        onChange={(e) => updateField("description", e.target.value)}
                    />
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
                        <Input
                            placeholder="Mobile Number"
                            value={restaurantData.mobileNumber}
                            onChange={(e) =>
                                updateField("mobileNumber", e.target.value)
                            }
                        />

                        <Input
                            placeholder="Website 1 URL"
                            onChange={(e) => updateWebsite(0, e.target.value)}
                        />

                        <Input
                            placeholder="Website 2 URL"
                            onChange={(e) => updateWebsite(1, e.target.value)}
                        />

                        <Input
                            placeholder="Website 3 URL"
                            onChange={(e) => updateWebsite(2, e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
