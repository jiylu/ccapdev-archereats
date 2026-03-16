import { useEffect, useState } from "react";
import { fetchUser } from "../../../api/user.api";
import type { Post } from "../../../types/post";
import type { User } from "../../../types/user";
import { Button } from "../../../components/ui/button";
import CommentMeta from "../ui/comment-meta";
import CommentHeader from "../ui/comment-header";

interface CommentProps {
    post: Post
}

export default function Comment (props: CommentProps) {
    const [postUser, setPostUser] = useState<User | null>(null); 

    useEffect(() => {
        const fetchUserComment = async () => {
            try {
                console.log(props.post.user)
                const userData = await fetchUser(props.post.user);
                setPostUser(userData); 
            } catch (err) {
                console.log(err)
            }
        }

        fetchUserComment();
    }, [props.post.user]);

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
            />
            
            <CommentMeta 
                ratePricing={props.post.ratePricing}
                waitTime={props.post.waitTime}
                recommended={props.post.recommended}
            />
            
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">{props.post.content}</p>

            <div className="mt-4 flex gap-2">
                <Button variant="outline" className="border-zinc-300 bg-white">
                    Helpful ({props.post.likes})
                </Button>
            </div>
        </article>
    )

}