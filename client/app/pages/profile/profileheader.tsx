import { Button } from "../../components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ProfileStats } from "./profile-stats";
import type { User } from "../../types/user";
import { useAuth } from "../../hooks/useAuth";

interface ProfileHeaderProps {
    profileUser: User
    postAmt: number
}

export default function ProfileHeader (props: ProfileHeaderProps) {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="flex pt-10 pb-12 w-full bg-[#f1f2ed] justify-center">
            <div className="flex gap-10 max-w-3xl w-full px-6">
                <div className="shrink-0">
                    <img
                        src={props.profileUser.avatar}
                        alt="Profile Picture"
                        className="w-36 h-36 rounded-2xl object-cover shadow-md border-2 border-white"
                    />
                </div>

                <div className="flex flex-col justify-center text-[#123524] gap-1">
                    
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight">{`${props.profileUser.firstName + " " + props.profileUser.lastName}`}</h1>
                        {props.profileUser._id === user?._id && (
                            <Button
                                size="sm"
                                variant="outline"
                                className="text-xs text-[#123524] border-[#123524]/25 hover:bg-[#123524]/5 rounded-full px-4"
                                onClick={() => navigate('/edit-profile')}
                            >
                                Edit Profile
                            </Button>
                        )}

                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#123524]/60">
                        <span>@{props.profileUser.username}</span>
                        <span className="w-1 h-1 rounded-full bg-[#123524]/30" />
                        <span className="text-emerald-700 font-medium">{props.profileUser.isStudent ? "Student" : "Non-student"}</span>
                    </div>

                    <p className="text-sm text-[#123524]/75 leading-relaxed mt-1 max-w-md">{props.profileUser.biography || "No biography yet."}</p>

                    <ProfileStats
                        reviewAmt={props.postAmt}
                        favoriteAmt={props.profileUser.favoriteRestaurants.length}
                    />
                </div>
            </div>
        </div>
    );
}