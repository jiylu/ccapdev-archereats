import Reply, { IReply } from "models/Replies.js";
import Post from "models/Post.js";
import Restaurant from "models/Restaurant.js";
import { ReplyInput } from "types/reply.js";
import mongoose from "mongoose";

export interface ReplyCreateInput {
    user: string;
    post: string;
    content: string;
    isAnonymous?: boolean;
}

export const createReply = async (replyData: ReplyCreateInput) => {
    const reply = new Reply({
        ...replyData,
        isAnonymous: replyData.isAnonymous || false,
    });

    await reply.save();

    const parentPost = await Post.findById(reply.post).populate("restaurant");
    if (!parentPost) throw new Error("Parent post not found");

    parentPost.replies.push(reply._id);
    await parentPost.save();

    const restaurant = parentPost.restaurant as any;
    const isRestaurantOwner =
        restaurant?.owner?.toString() === reply.user.toString();

    return {
        _id: reply._id.toString(),
        user: reply.isAnonymous && !isRestaurantOwner ? null : reply.user.toString(),
        post: reply.post.toString(),
        content: reply.content,
        isAnonymous: isRestaurantOwner ? false : reply.isAnonymous,
        likes: reply.likes,
        creationDate: reply.creationDate,
        canEdit: true,
        isRestaurantOwner,
        displayName: isRestaurantOwner ? restaurant.restaurantName : undefined,
        displayAvatar: isRestaurantOwner ? restaurant.images?.[0] || "/default-avatar.svg" : undefined,
    };
};

export const getRepliesByPostIdService = async (postId: string): Promise<ReplyInput[]> => {
    const replies = await Reply.find({ post: postId, deleted: false })
        .populate("user", "firstName lastName avatar")
        .populate({
            path: "post",
            populate: {
                path: "restaurant",
                model: "Restaurant"
            }
        });

    return replies.map((reply) => {
        const r = reply.toObject() as any;

        const restaurant = r.post?.restaurant;
        const replyUserId = r.user?._id?.toString?.() || r.user?.toString?.() || "";
        const restaurantOwnerId = restaurant?.owner?.toString?.() || "";
        const isRestaurantOwner = replyUserId === restaurantOwnerId;

        return {
            _id: r._id.toString(),
            user: r.isAnonymous && !isRestaurantOwner ? null : replyUserId,
            post: typeof r.post === "object" ? r.post._id.toString() : r.post.toString(),
            content: r.content,
            isAnonymous: isRestaurantOwner ? false : r.isAnonymous,
            likes: r.likes,
            creationDate: r.creationDate,
            isRestaurantOwner,
            displayName: isRestaurantOwner ? restaurant?.restaurantName : undefined,
            displayAvatar: isRestaurantOwner ? restaurant?.images?.[0] || "/default-avatar.svg" : undefined,
        };
    });
};

export const likeReply = async (replyId: string, userId: string) => {
    const reply = await Reply.findById(replyId);
    if (!reply) throw new Error("Reply not found");

    const alreadyLiked = reply.likedBy.some(
        (id) => id.toString() === userId
    );

    if (!alreadyLiked) {
        reply.likedBy.push(new mongoose.Types.ObjectId(userId));
        reply.likes = reply.likedBy.length;
        await reply.save();
    }

    return reply;
};

export const unlikeReply = async (replyId: string, userId: string) => {
    const reply = await Reply.findById(replyId);
    if (!reply) throw new Error("Reply not found");

    reply.likedBy = reply.likedBy.filter(
        (id) => id.toString() !== userId
    ) as any;

    reply.likes = reply.likedBy.length;
    await reply.save();

    return reply;
};

export const updateReply = async (
    replyId: string,
    userId: string,
    updateData: {
        content?: string;
        isAnonymous?: boolean;
    }
) => {
    const reply = await Reply.findById(replyId).populate({
        path: "post",
        populate: {
            path: "restaurant",
            model: "Restaurant"
        }
    });

    if (!reply) {
        throw new Error("Reply not found");
    }

    if (reply.deleted) {
        throw new Error("Reply has already been deleted");
    }

    const replyUserId = reply.user?.toString();
    if (replyUserId !== userId) {
        throw new Error("Unauthorized");
    }

    const postObj = reply.post as any;
    const postId = postObj?._id?.toString?.() || postObj?.toString?.() || "";
    const restaurant = postObj?.restaurant;

    const isRestaurantOwner =
        restaurant?.owner?.toString() === reply.user?.toString();

    if (typeof updateData.content === "string") {
        const trimmedContent = updateData.content.trim();

        if (!trimmedContent) {
            throw new Error("Reply content is required");
        }

        reply.content = trimmedContent;
    }

    if (!isRestaurantOwner && typeof updateData.isAnonymous === "boolean") {
        reply.isAnonymous = updateData.isAnonymous;
    }

    await reply.save();

    return {
        _id: reply._id.toString(),
        user: reply.isAnonymous && !isRestaurantOwner ? null : reply.user?.toString() || null,
        post: postId,
        content: reply.content,
        isAnonymous: isRestaurantOwner ? false : reply.isAnonymous,
        likes: reply.likes,
        likedBy: reply.likedBy.map((id) => id.toString()),
        creationDate: reply.creationDate,
        canEdit: true,
        isRestaurantOwner,
        displayName: isRestaurantOwner ? restaurant?.restaurantName : undefined,
        displayAvatar: isRestaurantOwner ? restaurant?.images?.[0] || "/default-avatar.svg" : undefined,
    };
};

export const deleteReply = async (replyId: string, userId: string) => {
    const reply = await Reply.findById(replyId);

    if (!reply) {
        throw new Error("Reply not found");
    }

    if (reply.deleted) {
        throw new Error("Reply has already been deleted");
    }

    if (reply.user?.toString() !== userId) {
        throw new Error("Unauthorized");
    }

    reply.deleted = true;
    await reply.save();

    return {
        _id: reply._id.toString(),
        deleted: true,
    };
};