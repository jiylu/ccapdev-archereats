import Post, { IPost } from "models/Post.js";
import Restaurant from "models/Restaurant.js";
import { PostCreateInput } from "types/post.js";

export const createPost = async (postData: PostCreateInput): Promise<IPost> => {
    const post = new Post({
        ...postData,
        isAnonymous: postData.isAnonymous || false,
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
};

export const getPosts = async () => {
    const posts = await Post.find()
        .populate("user", "name")
        .populate("restaurant", "name")
        .populate({
            path: "replies",
            populate: { path: "user", select: "name" } // populate reply authors
        });

    return posts.map(post => {
        const p = post.toObject();
        p.user = p.user?._id || p.user; 
        if (p.replies && p.replies.length > 0) {
            p.replies = p.replies.map((reply: any) => reply.isAnonymous ? { ...reply, user: null } : reply);
        }
        return p;
    });
};

export const getPostById = async (id: string) => {
    return await Post.findById(id)
}

export const getPostsByRestaurantIdService = async (restaurantId: string) => {
    const posts = await Post.find({ restaurant: restaurantId})
        .populate("user", "name")
        .populate("restaurant", "name")
        .populate({
            path: "replies",
            populate: { path: "user", select: "name" } 
        });

    return posts.map(post => {
        const p = post.toObject();
        p.user = p.user?._id || p.user; 
        if (p.replies && p.replies.length > 0) {
            p.replies = p.replies.map((reply: any) => reply.isAnonymous ? { ...reply, user: null } : reply);
        }
        return p;
    });
}

export const likePost = async (postId: string) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");
    post.likes += 1;
    return await post.save();
}

export const deletePost = async (postId: string) => {
    return await Post.findByIdAndUpdate(postId, { deleted: true }, { new: true } )
}

export const editPost = async (postId: string, postData: PostCreateInput) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");

    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { 
            rating: postData.rating, 
            content: postData.content, 
            ratePricing: postData.ratePricing,
            waitTime: postData.waitTime,
            recommended: postData.recommended
        },
        { new: true }
    );

    if (!updatedPost) throw new Error("Failed to update post");

    return updatedPost;
}