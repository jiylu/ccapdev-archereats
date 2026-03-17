import { useEffect, useState } from "react";
import { fetchUser } from "../../../../api/user.api";
import type { Reply } from "../../../../types/reply";
import type { User } from "../../../../types/user";
import { Button } from "../../../../components/ui/button";
import ReplyHeader from "./reply-header";

interface ReplyItemProps {
    reply: Reply;
}

export default function ReplyItem(props: ReplyItemProps) {
    const [replyUser, setReplyUser] = useState<User | null>(null);

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
                isAnonymous={props.reply.isAnonymous}
                isRestaurantOwner={props.reply.isRestaurantOwner}
                replyId={props.reply._id}
                canEdit={props.reply.canEdit}
            />

            <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                {props.reply.content}
            </p>

            <div className="mt-3 flex gap-2">
                <Button variant="outline" className="border-zinc-300 bg-white">
                    Helpful ({props.reply.likes})
                </Button>
            </div>
        </div>
    );
}