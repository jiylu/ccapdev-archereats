import Post, { IPost } from "models/Post.js";

export const createPost = async (postDate: Partial<IPost>) => {
    const post = new Post(postDate);
    return await post.save();
}

export const getPosts = async () => {
    const posts = await Post.find()
        .populate("user", "name")
        .populate("restaurant", "name")
        .populate({
            path: "replies",
            populate: { path: "user", select: "name" } // populate reply authors
        });

    return posts.map(post => {
        const p: any = post.toObject();
        if (p.isAnonymous) p.user = null; // mask post author
        if (p.replies && p.replies.length > 0) {
            p.replies = p.replies.map((reply: any) => reply.isAnonymous ? { ...reply, user: null } : reply);
        }
        return p;
    });
};

export const likePost = async (postId: string) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");
    post.likes += 1;
    return await post.save();
}

export const replyToPost = async (postId: string, replyData: any) => {
    const replyPost = new Post(replyData);
    await replyPost.save();

    const parentPost = await Post.findById(postId);
    if (!parentPost) throw new Error("Parent post not found");

    parentPost.replies.push(replyPost._id);
    await parentPost.save();

    return replyPost;
}