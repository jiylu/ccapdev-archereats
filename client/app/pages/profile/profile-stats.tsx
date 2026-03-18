import { Heart, MessageSquareText } from "lucide-react";
import { StatItem } from "./profile-stat-item";

interface profileStatsProps {
    reviewAmt: number;
    favoriteAmt: number;
}

export function ProfileStats(props: profileStatsProps) {
    return (
        <div className="flex items-center gap-3 mt-5">
            <StatItem icon={MessageSquareText} label="Reviews" value={props.reviewAmt} />
            <div className="w-px h-8 bg-gray-200" />
            <StatItem icon={Heart} label="Favorites" value={props.favoriteAmt} />
        </div>
    )
}