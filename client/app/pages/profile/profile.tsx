import Navbar from "../../components/layout/navbar";
import ProfileHeader from "./profileheader";
import { fetchPostsByUser } from "../../api/post.api";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { Post } from "../../types/post";
import ProfileFooter from "./profile-footer";
import PageLoader from "../../components/ui/loading";
import { useParams } from "react-router-dom";
import { fetchUserByUsername } from "../../api/user.api";
import type { User } from "../../types/user";

//TODO: Fetch reviews for user only
//TODO: Make Restaurants Clickable -> Redirect to its Review Page 
export default function Profile() {
    const { user } = useAuth();
    const { username } = useParams<{ username: string }>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [profileUser, setProfileUser] = useState<User>();
    
    useEffect(() => {
        const fetchUserPosts = async () => {
            if (!username) return;
            
            try {
            const fetchedUser = await fetchUserByUsername(username);
            setProfileUser(fetchedUser);

            // Use fetchedUser directly, not profileUser
            const fetchedPosts = await fetchPostsByUser(fetchedUser._id);
            setPosts(fetchedPosts);
            console.log("Fetched posts:", fetchedPosts);
            
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchUserPosts();

        document.title = "Profile | ArcherEats";
    }, [username]);

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

            {profileUser && (
            <>
                <ProfileHeader 
                    profileUser={profileUser} 
                    postAmt={posts.length}
                />

                <ProfileFooter 
                    reviews={posts} 
                    user={profileUser} 
                />
            </>
            )}
        </div>
    );
}