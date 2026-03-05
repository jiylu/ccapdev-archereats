import Post, { IPost } from "models/Post.js";

export const createPost = async (postDate: Partial<IPost>) => {
    const post = new Post(postDate);
    return await post.save();
}

export const getPosts = async () => {
    return await Post.find().populate("user", "name").populate("restaurant", "name");
};

export const likePost = async (postId: string) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");
    post.likes += 1;
    return await post.save();
}