import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

type Props = {
    restaurantData: any;
    setRestaurantData: React.Dispatch<React.SetStateAction<any>>;
}

export default function AddFoodDetails({ restaurantData, setRestaurantData }: Props) {
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
                            <Input placeholder="Tag 1"
                                onChange={(e) => updateTag(0, e.target.value)}/>
                            <Input placeholder="Tag 2"
                                onChange={(e) => updateTag(1, e.target.value)}/>
                            <Input placeholder="Tag 3"
                                onChange={(e) => updateTag(2, e.target.value)}/>
                            <Input placeholder="Tag 4"
                                onChange={(e) => updateTag(3, e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-[#123524] mt-4">
                            Price Range *
                        </h2>

                        <div className="grid grid-cols-2 gap-4 mt-3">
                            <Input placeholder="Min. Price"
                                type="number"
                                onChange={(e) => updateField('minPrice', Number(e.target.value))}
                            />
                            <Input placeholder="Max. Price"
                                type="number"
                                onChange={(e) => updateField('maxPrice', Number(e.target.value))}
                            />
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
                        <Input placeholder="Address" className="mt-3"
                            onChange={(e) => updateField('address', e.target.value)}/>
                        <Input placeholder="Google Maps Link" className="mt-3"
                            onChange={(e) => updateField('googleMapsLink', e.target.value)}/>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-[#123524] mt-4">
                            Operating Hours *
                        </h2>

                        <div className="grid grid-cols-2 gap-4 mt-3">

                            <Input
                                type="time"
                                placeholder="Opening Hours"
                                value={restaurantData.openingHour}
                                onChange={(e) =>
                                    setRestaurantData({
                                        ...restaurantData,
                                        openingHour: e.target.value
                                    })
                                }
                            />

                            <Input
                                type="time"
                                placeholder="Closing Hours"
                                value={restaurantData.closingHour}
                                onChange={(e) =>
                                    setRestaurantData({
                                        ...restaurantData,
                                        closingHour: e.target.value
                                    })
                                }
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}