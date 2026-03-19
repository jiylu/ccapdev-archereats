import { useEffect, useState } from "react";
import { fetchUser } from "../../../../api/user.api";
import { likeReply, unlikeReply, updateReply, deleteReply } from "../../../../api/replies.api";
 import type { Reply } from "../../../../types/reply";
import type { User } from "../../../../types/user";
import { Button } from "../../../../components/ui/button";
import ReplyHeader from "./reply-header";
import { useAuth } from "../../../../hooks/useAuth";
import { LoginModal } from "../../../../components/auth/login-modal";
import ReplyComposer from "../reply-composer";

interface ReplyItemProps {
    reply: Reply;
    onDeleted?: (replyId: string) => void;
}

export default function ReplyItem(props: ReplyItemProps) {
    const { user } = useAuth();
    const [replyUser, setReplyUser] = useState<User | null>(null);
    const [loginOpen, setLoginOpen] = useState(false);
    
    const [likes, setLikes] = useState(props.reply.likes || 0);
    const [liked, setLiked] = useState(
        props.reply.likedBy?.includes(user?._id || "") || false
    );
    const [likeLoading, setLikeLoading] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [replyContent, setReplyContent] = useState(props.reply.content);
    const [replyAnonymous, setReplyAnonymous] = useState(props.reply.isAnonymous);

    const canEdit =
    !!user &&
    (
        props.reply.canEdit === true ||
        (!!props.reply.user && props.reply.user === user._id)
    );

    useEffect(() => {
        const fetchReplyUser = async () => {
            if (
                !props.reply.user ||
                props.reply.isAnonymous ||
                props.reply.isRestaurantOwner
            ) return;

            try {
                const userData = await fetchUser(props.reply.user);
                setReplyUser(userData);
            } catch (err) {
                console.log(err);
            }
        };

        fetchReplyUser();
    }, [props.reply.user, props.reply.isAnonymous, props.reply.isRestaurantOwner]);

    useEffect(() => {
        setLikes(props.reply.likes || 0);
    }, [props.reply.likes]);

    useEffect(() => {
        setLiked(props.reply.likedBy?.includes(user?._id || "") || false);
    }, [props.reply.likedBy, user?._id]);

    useEffect(() => {
        setReplyContent(props.reply.content);
        setReplyAnonymous(props.reply.isAnonymous);
    }, [props.reply.content, props.reply.isAnonymous]);

    const handleHelpfulClick = async () => {
        if (!user) {
            setLoginOpen(true);
            return;
        }

        if (!props.reply._id || likeLoading) return;

        try {
            setLikeLoading(true);

            let updatedReply: Reply;

            if (liked) {
                updatedReply = await unlikeReply(props.reply._id);
            } else {
                updatedReply = await likeReply(props.reply._id);
            }

            setLikes(updatedReply.likes || 0);
            setLiked(updatedReply.likedBy?.includes(user._id) || false);
        } catch (err) {
            console.log(err);
        } finally {
            setLikeLoading(false);
        }
    };

    const handleEditSubmit = async (content: string, isAnonymous: boolean) => {
        if (!props.reply._id) return;

        try {
            const updatedReply = await updateReply(props.reply._id, {
                content,
                isAnonymous,
            });

            setReplyContent(updatedReply.content);
            setReplyAnonymous(updatedReply.isAnonymous);
            setIsEditing(false);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async () => {
        if (!props.reply._id) return;

        try {
            await deleteReply(props.reply._id);
            props.onDeleted?.(props.reply._id);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    const displayName = props.reply.isRestaurantOwner
        ? props.reply.displayName || "Restaurant"
        : props.reply.isAnonymous
        ? "Anonymous User"
        : `${replyUser?.firstName || ""} ${replyUser?.lastName || ""}`.trim();

    const displayAvatar = props.reply.isRestaurantOwner
        ? props.reply.displayAvatar || "/default-avatar.svg"
        : props.reply.isAnonymous
        ? "/default-avatar.svg"
        : replyUser?.avatar || "/default-avatar.svg";

    return (
        <div className="mt-3 ml-8 rounded-xl border border-zinc-200 bg-white p-4">
            <ReplyHeader
                title={displayName}
                avatar={displayAvatar}
                date={props.reply.creationDate}
                isAnonymous={replyAnonymous}
                isRestaurantOwner={props.reply.isRestaurantOwner}
                replyId={props.reply._id}
                canEdit={canEdit}
                onEdit={() => setIsEditing(true)}
                onDelete={handleDelete}
            />

            {isEditing ? (
                <ReplyComposer
                    open={isEditing}
                    onCancel={() => setIsEditing(false)}
                    onSubmit={handleEditSubmit}
                    disableAnonymous={props.reply.isRestaurantOwner || false}
                    initialContent={replyContent}
                    initialAnonymous={replyAnonymous}
                    submitLabel="Save Changes"
                    label="Edit reply"
                />
            ) : (
                <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                    {replyContent}
                </p>
            )}

            {!isEditing && (
                <div className="mt-3 flex gap-2">
                    <Button
                        variant="outline"
                        className="border-zinc-300 bg-white"
                        onClick={handleHelpfulClick}
                        disabled={likeLoading}
                    >
                        {liked ? "Helpful ✓" : "Helpful"} ({likes})
                    </Button>
                </div>
            )}

            <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
        </div>
    );
}