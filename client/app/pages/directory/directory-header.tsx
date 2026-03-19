import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectItem, SelectValue } from "../../components/ui/select";

interface DirectoryHeaderProps {
    currentPage: number;
    pageAmt: number;
    setSortOption: (value: string) => void;
}


export default function DirectoryHeader (props: DirectoryHeaderProps) {
    return (
        <div className="flex mb-3 justify-between items-center">
            <span className="font-semibold">Showing {props.currentPage} of {props.pageAmt} page(s)</span>
            <div className="flex items-center">
                <span className="mr-2.5 whitespace-nowrap font-semibold">Sort By:</span>
                <Select onValueChange={(value) => props.setSortOption(value)}>
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Filters</SelectLabel>
                            <SelectItem value="highestRating">Sort by Highest Rating</SelectItem>
                            <SelectItem value="mostPopular">Sort by Most Popular</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>  
        </div>
    )
}