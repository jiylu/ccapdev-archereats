import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function AddFoodDetails() {
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
                            <Input placeholder="Tag 1"/>
                            <Input placeholder="Tag 2"/>
                            <Input placeholder="Tag 3"/>
                            <Input placeholder="Tag 4"/>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-[#123524] mt-4">
                            Price Range *
                        </h2>

                        <div className="grid grid-cols-2 gap-4 mt-3">
                            <Input placeholder="Min. Price"/>
                            <Input placeholder="Max. Price"/>
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
                        <Input placeholder="Address" className="mt-3"/>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-[#123524] mt-4">
                            Opening Hours *
                        </h2>
                        <div className="flex-mt-3 mt-3">
                            <Input placeholder="Hours" className="rounded-r-none w-[90%]"/>
                            <Button className="rounded-l-none bg-gray-200 text-[#123524] hover:bg-gray-300"
                            variant="secondary">&gt;</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}