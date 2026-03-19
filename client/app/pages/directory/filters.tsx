import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Checkbox } from "../../components/ui/checkbox"
import { Label } from "../../components/ui/label";
import { Star } from "lucide-react";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";

type FiltersProps = {
    filters: {
        priceRange: string[];
        minRating: number;
        cuisines: string[];
        food: string[];
        tags: string[];
    };
    setFilters: React.Dispatch<React.SetStateAction<any>>;
};

export default function Filters({ filters, setFilters }: FiltersProps)  {
    return (
        <aside className="w-63 min-h-screen bg-white border-r border-gray-100 shadow-[1px_0_8px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col p-6 gap-7">

                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold tracking-tight text-gray-900">Filters</span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                            setFilters(prev => ({
                                ...prev,
                                priceRange: [],
                                minRating: 0,
                                cuisines: [],
                                food: [],
                                tags: [],
                            }))
                        }
                        className="text-xs text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 px-2 h-7"
                    >
                        Reset all
                    </Button>
                </div>

                <Separator />

                <div className="flex flex-col gap-3">
                    <span className="text-sm font-semibold text-gray-800">Price Range</span>
                    <ToggleGroup 
                        type="multiple" 
                        className="justify-start gap-2"
                        value={filters.priceRange}
                        onValueChange={(value) =>
                            setFilters((prev: typeof filters) => ({
                                ...prev,
                                priceRange: value
                            }))
                        }
                    >
                        {["₱", "₱₱", "₱₱₱"].map((price) => (
                            <ToggleGroupItem
                                key={price}
                                value={price}
                                className="flex-1 h-9 rounded-lg border border-gray-200 bg-gray-50 font-bold text-sm text-gray-500 data-[state=on]:bg-[#1E4D36] data-[state=on]:text-white data-[state=on]:border-[#1E4D36] hover:border-[#1E4D36] hover:text-[#1E4D36] transition-all duration-150"
                            >
                                {price}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </div>

                <Separator />

                <div className="flex flex-col gap-3">
                    <span className="text-sm font-semibold text-gray-800">Minimum Rating</span>
                    <RadioGroup
                        value={filters.minRating.toString()}
                        onValueChange={(value) =>
                            setFilters((prev: typeof filters) => ({ ...prev, minRating: Number(value) }))
                        }
                        className="gap-2"
                    >
                        {["4", "3", "2", "1"].map((val) => (
                            <div key={val} className="flex items-center gap-3">
                                <RadioGroupItem
                                    value={val}
                                    id={`rating-${val}`}
                                    className="border-2 border-gray-300 data-[state=checked]:bg-[#1E4D36] data-[state=checked]:border-[#1E4D36]"
                                />
                                <Label htmlFor={`rating-${val}`} className="flex items-center gap-1.5 cursor-pointer">
                                    <div className="flex gap-0.5">
                                        {Array.from({ length: Number(val) }).map((_, i) => (
                                            <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-500">& up</span>
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                <Separator />

                <div className="flex flex-col gap-3">
                    <span className="text-sm font-semibold text-gray-800">Cuisine</span>
                    <div className="flex flex-col gap-2.5">
                        {["Filipino", "Chinese", "American", "Italian", "Mexican", "Mediterranean", "Japanese"].map((cuisine) => (
                            <div key={cuisine} className="flex items-center gap-3">
                                <Checkbox
                                    id={cuisine.toLowerCase()}
                                    checked={filters.cuisines.includes(cuisine)}
                                    onCheckedChange={(checked) => {
                                        setFilters((prev: typeof filters) => ({
                                            ...prev,
                                            cuisines: checked
                                                ? [...prev.cuisines, cuisine]
                                                : prev.cuisines.filter(c => c !== cuisine)
                                        }));
                                    }}
                                    className="border-2 border-gray-300 rounded data-[state=checked]:bg-[#1E4D36] data-[state=checked]:border-[#1E4D36]"
                                />
                                <Label
                                    htmlFor={cuisine.toLowerCase()}
                                    className="text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
                                >
                                    {cuisine}
                                </Label>
                            </div>
                        ))}
                    </div>
                    <Separator />
                </div>

                <div className="flex flex-col gap-3">
                    <span className="text-sm font-semibold text-gray-800">Food</span>
                    <div className="flex flex-col gap-2.5">
                        {["Burger", "Fries", "Wings", "Chicken", "Sisig", "Noodle", "Coffee", "Tacos", "Burrito", "Shawarma", "Sushi"].map((food) => (
                            <div key={food} className="flex items-center gap-3">
                                <Checkbox
                                    id={food.toLowerCase()}
                                    checked={filters.food.includes(food)}
                                    onCheckedChange={(checked) => {
                                        setFilters((prev: typeof filters) => ({
                                            ...prev,
                                            food: checked
                                                ? [...prev.food, food]
                                                : prev.food.filter(c => c !== food)
                                        }));
                                    }}
                                    className="border-2 border-gray-300 rounded data-[state=checked]:bg-[#1E4D36] data-[state=checked]:border-[#1E4D36]"
                                />
                                <Label
                                    htmlFor={food.toLowerCase()}
                                    className="text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
                                >
                                    {food}
                                </Label>
                            </div>
                        ))}
                    </div>
                    <Separator />
                </div>

                <div className="flex flex-col gap-3">
                    <span className="text-sm font-semibold text-gray-800">Tags</span>
                    <div className="flex flex-col gap-2.5">
                        {["Comfort Food", "Student Friendly", "Fast Food", "Cheesy", "Aesthetic", "Casual Dining", "Bar", "Alcoholic Drinks", "Dessert", "Grilled", "Budget"].map((tag) => (
                            <div key={tag} className="flex items-center gap-3">
                                <Checkbox
                                    id={tag.toLowerCase()}
                                    checked={filters.tags.includes(tag)}
                                    onCheckedChange={(checked) => {
                                        setFilters((prev: typeof filters) => ({
                                            ...prev,
                                            tags: checked
                                                ? [...prev.tags, tag]
                                                : prev.tags.filter(c => c !== tag)
                                        }));
                                    }}
                                    className="border-2 border-gray-300 rounded data-[state=checked]:bg-[#1E4D36] data-[state=checked]:border-[#1E4D36]"
                                />
                                <Label
                                    htmlFor={tag.toLowerCase()}
                                    className="text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
                                >
                                    {tag}
                                </Label>
                            </div>
                        ))}
                    </div>
                    <Separator />
                </div>


            </div>
        </aside>
    );
}