import Navbar from "../../components/layout/navbar";
import ProfileHeader from "./profileheader";
import { findRestaurantPosts } from "../../api/post.api";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { Post } from "../../types/post";
import ProfileFooter from "./profile-footer";
import PageLoader from "../../components/ui/loading";

//TODO: Make this dynamic, make userId as params
//TODO: Fetch reviews for user only
//TODO: If logged user === userId in webpage show the edit button

//TODO: Make Restaurants Clickable -> Redirect to its Review Page 
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

    if (loading) return <PageLoader />;

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
                user={user}
            />
            
            <ProfileFooter 
                reviews={posts}
                user={user}
            />
        </div>
    );
}