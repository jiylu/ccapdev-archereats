import Navbar from "../../components/layout/navbar";
import ProfileHeader from "./profileheader";
import ReviewsSection from "./reviews-section";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Profile() {

    const { user } = useAuth();

    useEffect(() => {
        document.title = "Profile | ArcherEats";
    }, []);

    if (!user) {
        return (
            <div className="min-h-screen bg-[#fffcf5]">
                <Navbar />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fffcf5]">
            <Navbar />

            <ProfileHeader
                name={`${user.firstName} ${user.lastName}`}
                username={`@${user.username}`}
                status={user.isStudent ? "Student" : "Non-student"}
                bio={user.biography || "No biography yet."}
                avatarUrl={user.avatar || "/default-avatar.svg"}
            />

            <hr className="my-10 mx-6 md:mx-20 border-0 h-[2px] bg-gray-200 rounded" />

            <ReviewsSection />
        </div>
    );
}