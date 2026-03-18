import { useEffect, useState } from "react";
import { fetchUser } from "../../../api/user.api";
import { createReply, getRepliesByPostId } from "../../../api/replies.api";
import { likePost, unlikePost } from "../../../api/post.api";
import type { Post } from "../../../types/post";
import type { Reply } from "../../../types/reply";
import type { User } from "../../../types/user";
import { Button } from "../../../components/ui/button";
import CommentMeta from "../ui/comment-meta";
import CommentHeader from "../ui/comment-header";
import { useAuth } from "../../../hooks/useAuth";
import ReplyComposer from "./reply-composer";
import ReplyItem from "./reply/reply-item";
import { getRestaurantById } from "../../../api/restaurant.api";
import { LoginModal } from "../../../components/auth/login-modal";
import CommentPhotoGallery from "../ui/comment-photo-gallery";

interface CommentProps {
    post: Post
}

export default function Comment(props: CommentProps) {
    const { user } = useAuth();
    const [postUser, setPostUser] = useState<User | null>(null);
    const [replyOpen, setReplyOpen] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [replies, setReplies] = useState<Reply[]>([]);
    const [isRestaurantOwner, setIsRestaurantOwner] = useState(false);

    const [likes, setLikes] = useState(props.post.likes || 0);
    const [liked, setLiked] = useState(
        props.post.likedBy?.includes(user?._id || "") || false
    );
    const [likeLoading, setLikeLoading] = useState(false);

    const handleReplyDeleted = (replyId: string) => {
        setReplies((prev) => prev.filter((reply) => reply._id !== replyId));
    };

    useEffect(() => {
        const fetchUserComment = async () => {
            try {
                const userData = await fetchUser(props.post.user);
                setPostUser(userData);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUserComment();
    }, [props.post.user, props.post.isAnonymous]);

    useEffect(() => {
        const fetchReplies = async () => {
            try {
                const data = await getRepliesByPostId(props.post._id);
                setReplies(data);
            } catch (err) {
                console.log(err);
            }
        };

        if (props.post._id) {
            fetchReplies();
        }
    }, [props.post._id]);

    useEffect(() => {
        setLikes(props.post.likes || 0);
    }, [props.post.likes]);
    
    useEffect(() => {
        setLiked(props.post.likedBy?.includes(user?._id || "") || false);
    }, [props.post.likedBy, user?._id]);

    useEffect(() => {
        const checkRestaurantOwner = async () => {
            try {
                const restaurant = await getRestaurantById(props.post.restaurant);
                setIsRestaurantOwner(restaurant.owner === user?._id);
            } catch (err) {
                console.log(err);
            }
        };

        if (user?._id && props.post.restaurant) {
            checkRestaurantOwner();
        }
    }, [props.post.restaurant, user?._id]);

    const handleReplyClick = () => {
        if (!user) {
            setLoginOpen(true);
            return;
        }

        setReplyOpen((prev) => !prev);
    }

    const handleReplySubmit = async (content: string, isAnonymous: boolean) => {
        try {
            const newReply = await createReply({
                post: props.post._id,
                content,
                isAnonymous: isRestaurantOwner ? false : isAnonymous,
            });

            setReplies((prev) => [...prev, newReply]);
            setReplyOpen(false);
            console.log("Created reply from backend:", newReply);
        } catch (err) {
            console.log(err);
        }
    };

    const handleHelpfulClick = async () => {
        if (!user) {
            setLoginOpen(true);
            return;
        }

        if (!props.post._id || likeLoading) return;

        try {
            setLikeLoading(true);

            let updatedPost: Post;

            if (liked) {
                updatedPost = await unlikePost(props.post._id);
            } else {
                updatedPost = await likePost(props.post._id);
            }

            setLikes(updatedPost.likes || 0);
            setLiked(updatedPost.likedBy?.includes(user._id) || false);
        } catch (err) {
            console.log(err);
        } finally {
            setLikeLoading(false);
        }
    };

    return (
        <article
            key={props.post._id}
            className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
        >
            <CommentHeader
                firstName={postUser ? postUser.firstName : ""}
                lastName={postUser ? postUser.lastName : ""}
                rating={props.post.rating}
                avatar={postUser ? postUser.avatar : ""}
                date={props.post.creationDate}
                isAnonymous={props.post.isAnonymous}
                currentUser={user?._id}
                commentOwner={props.post.user || ""}
                postId={props.post._id}
                restaurantId={props.post.restaurant}
                post={{
                    _id: props.post._id,
                    rating: props.post.rating,
                    content: props.post.content,
                    isAnonymous: props.post.isAnonymous,
                    ratePricing: props.post.ratePricing as "P" | "PP" | "PPP",
                    waitTime: props.post.waitTime as "No Wait" | "15-30m" | "1hr+",
                    recommended: props.post.recommended,
                    pictures: props.post.pictures,
                }}
            />

            <CommentMeta
                ratePricing={props.post.ratePricing}
                waitTime={props.post.waitTime}
                recommended={props.post.recommended}
            />

            <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                {props.post.content}
            </p>

            <CommentPhotoGallery pictures={props.post.pictures || []} />

            <div className="mt-4 flex flex-wrap gap-2">
                <Button
                    variant="outline"
                    className="border-zinc-300 bg-white"
                    onClick={handleHelpfulClick}
                    disabled={likeLoading}
                >
                    {liked ? "Helpful ✓" : "Helpful"} ({likes})
                </Button>

                <Button
                    variant="outline"
                    className="border-zinc-300 bg-white"
                    onClick={handleReplyClick}
                >
                    {replyOpen ? "Hide Reply" : "Reply"}
                </Button>

                {replies.length > 0 && (
                    <Button
                        variant="outline"
                        className="border-zinc-300 bg-white"
                        onClick={() => setShowReplies((prev) => !prev)}
                    >
                        {showReplies
                            ? "Hide Replies"
                            : `Show Replies (${replies.length})`}
                    </Button>
                )}
            </div>

            <ReplyComposer
                open={replyOpen}
                onCancel={() => setReplyOpen(false)}
                onSubmit={handleReplySubmit}
                disableAnonymous={isRestaurantOwner}
            />

            {showReplies && replies.length > 0 && (
                <div className="mt-3">
                    {replies.map((reply) => (
                        <ReplyItem
                            key={reply._id}
                            reply={reply}
                            onDeleted={handleReplyDeleted}
                        />
                    ))}
                </div>
            )}

            <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
        </article>
    );
}