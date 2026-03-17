import type { LucideIcon } from "lucide-react";

interface statItemProps {
    icon: LucideIcon;
    label: string;
    value: number;
}

export function StatItem(props: statItemProps) {
    return (
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors duration-150 cursor-default">
            <div className="p-1.5 bg-emerald-50 rounded-lg">
                <props.icon size={16} className="text-emerald-700" />
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800 leading-tight">{props.value}</span>
                <span className="text-xs text-gray-400 leading-tight">{props.label}</span>
            </div>
        </div>
    )
}