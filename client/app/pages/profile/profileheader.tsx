import { Button } from "../../components/ui/button";
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div className="flex mt-12 ml-12 md:m1-32 lg:ml-30">
            <img src={avatarUrl}
            alt = "Profile Picture"
            className = "w-52 h-52 rounded-full object-cover border border-gray-300"/>
            <div className="ml-10 mt-5 flex flex-col text-[#123524]">
                <div className="flex items-center gap-6">
                    <h1 className="text-4xl md:text-5xl font-bold">{name}</h1>
                    <Button 
                        size = "sm"
                        variant = "outline"
                        className = "text-[#123524] border-[#123524]/30 hover:bg-[#123524]/5"
                        onClick={() => navigate('/edit-profile')}> Edit Profile </Button>
                </div>
                <h2 className="text-lg md:text-xl opacity-75">{username}</h2>
                <h2 className="text-lg md:text-xl">{status}</h2>
                <h2 className="text-lg md:text-xl font-bold mt-2">Biography</h2>
                <p className="text-base md:text-lg max-w-lg leading-relaxed mt-1">{bio}</p>
            </div>
        </div>
    );
}

export default ProfileHeader;