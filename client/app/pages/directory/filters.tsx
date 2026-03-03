import { Badge } from "../../components/ui/badge";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Switch } from "../../components/ui/switch";
import { Checkbox } from "../../components/ui/checkbox"
import { Label } from "../../components/ui/label";
import { Star } from "lucide-react";
import { Field, FieldGroup } from "../../components/ui/field";

export default function Filters () {
    return (
        <aside className="border-r border-gray w-3xs shadow-[1px_0_4px_rgba(0,0,0,0.05)] bg-white min-h-screen">
            {/* main container */}
            <div className="flex flex-col p-7">
                <span className="text-2xl font-bold mb-5">Filters</span>

                <div className="flex flex-col gap-4.5">
                    {/* open now */}
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Open Now </span>
                        <Switch className="data-[state=checked]:bg-[#1E4D36]" id="open-now" />
                    </div>

                    {/* price range */}
                    <div className="flex flex-col">
                        <span className="text-lg font-bold mb-1.5">Price Range</span>
                        <div className="flex gap-2">
                            {["₱", "₱₱", "₱₱₱"].map((price) => (
                                <Label>
                                    <Checkbox value={price} className="sr-only peer"/> 
                                    <Badge className="
                                        w-15
                                        h-8  
                                        font-extrabold
                                        text-base
                                        cursor-pointer 
                                        border border-[#1E4D36] 
                                        bg-transparent 
                                        text-[#1E4D36] 
                                        peer-data-[state=checked]:bg-[#1E4D36]
                                        peer-data-[state=checked]:text-white 
                                        transition-all duration-200">
                                        {price}
                                    </Badge>
                                </Label>

                            ))}
                        </div>
                    </div>
                    
                    {/* rating */}
                    <div className="flex flex-col">
                        <span className="text-lg font-bold mb-2">Rating</span>
                        <RadioGroup>
                            {["4","3","2","1"].map((val) => (
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem 
                                        value={val}
                                        className="border-2 border-[#1E4D36] data-[state=checked]:bg-[#1E4D36] data-[state=checked]:border-[#1E4D36]" 
                                    />
                                    <Label className="flex items-center gap-1">
                                        <Star size={20} className="text-yellow-400 fill-yellow-400" />
                                        <span className="text-base">{val}+ Stars</span>
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    
                    {/* cuisine */}
                    <div className="flex flex-col">
                        <span className="text-lg font-bold mb-2">Cuisine</span>
                        <FieldGroup className="gap-2">
                            {["Filipino", "Chinese", "American", "Italian", "Mexican", "Mediterranean"].map((cuisine) => (
                                <Field orientation="horizontal">
                                    <Checkbox
                                    id={cuisine.toLowerCase()}
                                    className="border-2 border-[#1E4D36] data-[state=checked]:bg-[#1E4D36] data-[state=checked]:border-[#1E4D36]"
                                    />
                                    <Label htmlFor={cuisine.toLowerCase() + "-cuisine"}>
                                        <span className="text-base">{cuisine}</span>
                                    </Label>
                                </Field>
                            ))}
                        </FieldGroup>
                    </div>
                    
                    <span className="underline cursor-pointer">Show More</span>
                </div>

            </div>
        </aside>
    );
}   