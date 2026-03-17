import type { LucideIcon } from "lucide-react";

interface statItemProps {
    icon: LucideIcon;
    label: string;
    value: number;
}

export function StatItem (props: statItemProps) {
    return (
        <div className="flex items-center gap-2">
            <props.icon size={25} />
            <div className="flex flex-col gap-1">
                <span className="text-base leading-none font-bold">{props.value}</span>
                <span className="text-sm leading-none">{props.label}</span>
            </div>
        </div>
    )
}