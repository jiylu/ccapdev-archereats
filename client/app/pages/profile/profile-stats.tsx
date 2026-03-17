import { Camera, Heart, MessageSquareText } from "lucide-react";
import { StatItem } from "./profile-stat-item";

interface profileStatsProps {
    reviewAmt: number;
    favoriteAmt: number;
    photosAmt: number;
}

export function ProfileStats(props: profileStatsProps) {
    return (
        <div className="flex items-center gap-5 mt-5">
            <StatItem 
                icon={MessageSquareText}
                label={"Reviews"}
                value={props.reviewAmt}
            />

            <StatItem 
                icon={Heart}
                label={"Favorites"}
                value={props.reviewAmt}
            />

            <StatItem 
                icon={Camera}
                label={"Photos"}
                value={props.reviewAmt}
            />
        </div>
    )
}