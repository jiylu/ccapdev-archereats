import { Badge } from "./badge"


// gagawa lang to ng capsule for each tag sa array
export default function TagList({ tags }: { tags: string[] }) {
    return (
        <div className="flex flex-wrap gap-0.5">
            {tags.map((tag, index) => (
                <Badge
                    key={index}
                    className="rounded-xl bg-[#1E4D36] text-white cursor-pointer select-none transition-all duration-150 hover:bg-[#2d7a52] hover:scale-105 active:scale-95 active:brightness-90"
                >
                    {tag}
                </Badge>
            ))}
        </div>
    )
}