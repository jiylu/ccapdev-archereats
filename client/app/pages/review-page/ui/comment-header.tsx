import StarRating from "../../../components/ui/star-rating";

interface CommentHeaderProps {
    firstName: string;
    lastName: string;
    rating: number;
    avatar: string;
    date: string;
    isAnonymous: boolean;

}

export default function CommentHeader (props: CommentHeaderProps) {
    return (
        <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
                <img
                    src={props.isAnonymous ? "/default-avatar.svg" : props.avatar}
                    alt={props.isAnonymous ? "anon" : `${props.firstName} avatar`}
                    className="h-11 w-11 rounded-full border border-zinc-200"
                />
                <div>
                    <h3 className="font-semibold text-zinc-900">{props.isAnonymous ? "Anonymous User": `${props.firstName} ${props.lastName}`}</h3>
                    <p className="text-xs text-zinc-500">{new Date(props.date).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}</p>
                </div>


            </div>

            <div className="flex items-center gap-2">
                <StarRating rating={props.rating} size={15}/>
                <span className="font-semibold text-zinc-700">{props.rating}</span>
            </div>
        </div>
    )
}