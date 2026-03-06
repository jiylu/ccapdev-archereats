import Post, { IPost } from "models/Post.js";
import Restaurant from "models/Restaurant.js";

export const createPost = async (postDate: Partial<IPost>) => {
    const post = new Post({
        ...postDate, isAnonymous: postDate.isAnonymous || false, // default to false
    });

    await post.save();

    const restaurant = await Restaurant.findById(post.restaurant);
    if (restaurant) {
        const avgRating = restaurant.avgRating || 0;
        const amtRatings = restaurant.amtRatings || 0;

        const totalRating = avgRating * amtRatings + post.rating;
        restaurant.amtRatings = amtRatings + 1;
        restaurant.avgRating = totalRating / restaurant.amtRatings;
        await restaurant.save();
    }

    return post;
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
    const replyPost = new Post({
        ...replyData,
        isAnonymous: replyData.isAnonymous || false, // default false
    });
    await replyPost.save();

    const parentPost = await Post.findById(postId);
    if (!parentPost) throw new Error("Parent post not found");

    parentPost.replies.push(replyPost._id);
    await parentPost.save();

    return replyPost;
}