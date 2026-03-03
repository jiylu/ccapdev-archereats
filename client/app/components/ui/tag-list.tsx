import { Badge } from "./badge"


// gagawa lang to ng capsule for each tag sa array
export default function TagList ({ tags } : {tags : string[]}) {
    return (
        <div className="flex gap-0.5">
            {tags.map((tag, index) => (
                <Badge key={index} className="rounded-xl bg-[#1E4D36] text-white">
                    {tag}
                </Badge>
            ))}
        </div>
    )
}