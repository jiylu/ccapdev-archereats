import Navbar from "../../components/layout/navbar";
import ProfileReviewsSection from "./profile-reviews-section";
import ProfileHeader from "./profileheader";
import { findRestaurantPosts } from "../../api/post.api";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { Post } from "../../types/post";
import ReviewCard from "./profile-review-card";
import ProfileFooter from "./profile-footer";


export default function Profile() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const [fetchedPosts] = await Promise.all([
                    findRestaurantPosts("69a932c633dab442a8b4bb15"),
                ]);

                setPosts(fetchedPosts)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchUserPosts();

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
            
            <ProfileFooter 
                reviews={posts}
            />
        </div>
    );
}