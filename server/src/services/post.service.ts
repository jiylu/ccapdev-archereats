import Post, { IPost } from "models/Post.js";
import Restaurant from "models/Restaurant.js";
import "models/Replies.js";
import { PostCreateInput } from "types/post.js";
import mongoose from "mongoose";

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

export const getPosts = async (currentUserId?: string) => {
    const posts = await Post.find()
        .populate("user", "name")
        .populate("restaurant", "name")
        .populate({
            path: "replies",
            populate: [
                { path: "user", select: "firstName lastName avatar" },
                {
                    path: "post",
                    populate: { path: "restaurant", select: "restaurantName images owner" }
                }
            ]
        });

    return posts.map(post => {
        const p = post.toObject() as any;

        p.user = p.user?._id || p.user;
        p.restaurant = p.restaurant?._id || p.restaurant;
        p.likedBy = p.likedBy?.map((id: any) => id.toString()) || [];
        p.likes = p.likes || 0;

        if (p.replies && p.replies.length > 0) {
            p.replies = p.replies.map((reply: any) => {
                const replyUserId = reply.user?._id?.toString() || reply.user?.toString() || "";
                const restaurant = reply.post?.restaurant;
                const restaurantOwnerId = restaurant?.owner?.toString() || "";
                const isRestaurantOwner = replyUserId === restaurantOwnerId;
                const canEdit = replyUserId === currentUserId;

                return {
                    _id: reply._id.toString(),
                    user: reply.isAnonymous && !isRestaurantOwner ? null : replyUserId,
                    post: typeof reply.post === "object" ? reply.post._id.toString() : reply.post?.toString(),
                    content: reply.content,
                    isAnonymous: isRestaurantOwner ? false : reply.isAnonymous,
                    likes: reply.likes,
                    creationDate: reply.creationDate,
                    canEdit,
                    isRestaurantOwner,
                    displayName: isRestaurantOwner ? restaurant?.restaurantName : undefined,
                    displayAvatar: isRestaurantOwner ? restaurant?.images?.[0] || "/default-avatar.svg" : undefined,
                };
            });
        }

        return p;
    });
};

export const getPostById = async (id: string) => {
    return await Post.findById(id);
};

export const getPostsByRestaurantIdService = async (restaurantId: string, currentUserId?: string) => {
    const posts = await Post.find({ restaurant: restaurantId })
        .populate("user", "name")
        .populate("restaurant", "name")
        .populate({
            path: "replies",
            populate: [
                { path: "user", select: "firstName lastName avatar" },
                {
                    path: "post",
                    populate: { path: "restaurant", select: "restaurantName images owner" }
                }
            ]
        });

    return posts.map(post => {
        const p = post.toObject() as any;

        p.user = p.user?._id || p.user;
        p.restaurant = p.restaurant?._id || p.restaurant;
        p.likedBy = p.likedBy?.map((id: any) => id.toString()) || [];
        p.likes = p.likes || 0;

        if (p.replies && p.replies.length > 0) {
            p.replies = p.replies.map((reply: any) => {
                const replyUserId = reply.user?._id?.toString() || reply.user?.toString() || "";
                const restaurant = reply.post?.restaurant;
                const restaurantOwnerId = restaurant?.owner?.toString() || "";
                const isRestaurantOwner = replyUserId === restaurantOwnerId;
                const canEdit = replyUserId === currentUserId;

                return {
                    _id: reply._id.toString(),
                    user: reply.isAnonymous && !isRestaurantOwner ? null : replyUserId,
                    post: typeof reply.post === "object" ? reply.post._id.toString() : reply.post?.toString(),
                    content: reply.content,
                    isAnonymous: isRestaurantOwner ? false : reply.isAnonymous,
                    likes: reply.likes,
                    creationDate: reply.creationDate,
                    canEdit,
                    isRestaurantOwner,
                    displayName: isRestaurantOwner ? restaurant?.restaurantName : undefined,
                    displayAvatar: isRestaurantOwner ? restaurant?.images?.[0] || "/default-avatar.svg" : undefined,
                };
            });
        }

        return p;
    });
};

export const likePost = async (postId: string, userId: string) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");

    const alreadyLiked = post.likedBy.some(
        (id) => id.toString() === userId
    );

    if (!alreadyLiked) {
        post.likedBy.push(new mongoose.Types.ObjectId(userId));
        post.likes = post.likedBy.length;
        await post.save();
    }

    return post;
};

export const unlikePost = async (postId: string, userId: string) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");

    post.likedBy = post.likedBy.filter(
        (id) => id.toString() !== userId
    ) as any;

    post.likes = post.likedBy.length;
    await post.save();

    return post;
};

export const deletePost = async (postId: string) => {
    return await Post.findByIdAndUpdate(postId, { deleted: true }, { new: true });
};

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
};