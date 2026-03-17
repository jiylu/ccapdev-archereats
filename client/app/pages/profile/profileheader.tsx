import { Button } from "../../components/ui/button";
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileStats } from "./profile-stats";

interface ProfileHeaderProps {
    name: string;
    username: string;
    status: string;
    bio: string;
    avatarUrl?: string;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ name, username, status, bio, avatarUrl }) => {
    const navigate = useNavigate();

    return (
        <div className="flex pt-4 pb-10 w-full bg-[#f1f2ed] ">
            <div className="flex ml-30">
                <img src={avatarUrl}
                alt = "Profile Picture"
                className = "w-48 h-48 rounded-full object-cover border border-gray-300"/>
                
                <div className="ml-10 mt-2 flex flex-col text-[#123524]">
                    <div className="flex items-center gap-10">
                        <h1 className="text-3xl font-bold">{name}</h1>
                        <Button 
                            size = "sm"
                            variant = "outline"
                            className = "text-[#123524] border-[#123524]/30 hover:bg-[#123524]/5"
                            onClick={() => navigate('/edit-profile')}> Edit Profile </Button>
                    </div>

                    <div className="flex">
                        <h2 className="text-lg">
                        <span className="opacity-75">{username}</span> · <span>{status}</span>
                        </h2>
                    </div>

                    <h2 className="text-lg font-bold mt-2">Biography</h2>
                    <p className="text-base leading-relaxed mt-1">{bio}</p>
                    
                    <ProfileStats 
                        reviewAmt={10}
                        favoriteAmt={67}
                        photosAmt={12}
                    />
                </div>
            </div>
            

        </div>
    );
}

export default ProfileHeader;