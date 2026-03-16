import { useEffect, useState } from "react";
import { fetchUser } from "../../../api/user.api";
import type { Post } from "../../../types/post";
import type { User } from "../../../types/user";
import { Button } from "../../../components/ui/button";
import CommentHeader from "./comment-header";
import ReviewMeta from "./review-meta";


export default function Comment (props: Post) {
    const [postUser, setPostUser] = useState<User | null>(null); 
    useEffect(() => {
        const fetchUserComment = async () => {
            try {
                const userData = await fetchUser(props.userId);
                setPostUser(userData); 
            } catch (err) {
                console.log(err)
            }
        }

        fetchUserComment();
    }, [props.userId]);

    return (
        <article
            key={props._id}
            className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
        >
            <CommentHeader 
                firstName={postUser ? postUser.firstName : ""}
                lastName={postUser ? postUser.lastName : ""}
                rating={props.rating}
                avatar={postUser ? postUser.avatar : ""}
                date={props.date}
                isAnonymous={props.isAnonymous}
            />
            <ReviewMeta 
                ratePricing={props.ratePricing}
                waitTime={props.waitTime}
                recommended={props.recommended}
            />
            
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">{props.content}</p>

            <div className="mt-4 flex gap-2">
                <Button variant="outline" className="border-zinc-300 bg-white">
                    Helpful ({props.likes})
                </Button>
            </div>
        </article>
    )

}