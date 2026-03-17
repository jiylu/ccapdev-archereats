import ReplyActions from "././reply-actions";

interface ReplyHeaderProps {
    title: string;
    avatar: string;
    date: string;
    isAnonymous?: boolean;
    isRestaurantOwner?: boolean;
    replyId: string;
    canEdit?: boolean;
}

export default function ReplyHeader(props: ReplyHeaderProps) {
    return (
        <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
                <img
                    src={props.avatar}
                    alt={props.title}
                    className="h-9 w-9 rounded-full border border-zinc-200 object-cover"
                />
                <div>
                    <h4 className="text-sm font-semibold text-zinc-900">
                        {props.title}
                    </h4>
                    <p className="text-xs text-zinc-500">
                        {new Date(props.date).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                </div>
            </div>

            {props.canEdit && <ReplyActions replyId={props.replyId} />}
        </div>
    );
}