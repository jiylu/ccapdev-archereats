import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

export default function AddFoodDesc() {
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
                    <Textarea placeholder="Description..." className="min-h-[100px]"/>
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
                        <Input placeholder="Mobile Number"/>
                        <Input placeholder="Website 1 URL"/>
                        <Input placeholder="Website 2 URL"/>
                        <Input placeholder="Website 3 URL"/>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
