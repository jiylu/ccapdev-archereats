import Navbar from "../../components/layout/navbar";
import ProfileHeader from "./profileheader";
import ReviewsSection from "./reviews-section";

export default function Profile () {
    return (
        <>
            <div className="min-h-screen bg-[#fffcf5]">
                <Navbar />
                <ProfileHeader      // Temporary hardcoded data, will be replaced with dynamic data from backend
                    name="Juan Dela Cruz"
                    username="@juandelacruz"
                    status="Student"
                    bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    avatarUrl="/public/default-avatar.svg"
                />
                <hr className="my-10 mx-6 md:mx-20 border-0 h-[2px] bg-gray-200 rounded" />
                <ReviewsSection />
            </div>
        </>
    )
}