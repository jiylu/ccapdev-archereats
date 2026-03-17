import Reply, { IReply } from "models/Replies.js";
import Post from "models/Post.js";
import Restaurant from "models/Restaurant.js";
import { ReplyInput } from "types/reply.js";

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

export const likeReply = async (replyId: string) => {
    const reply = await Reply.findOne({ _id: replyId, deleted: false });
    if (!reply) throw new Error("Reply not found");

    reply.likes += 1;
    return await reply.save();
};

export const deleteReply = async (replyId: string) => {
    return await Reply.findByIdAndUpdate(replyId, { deleted: true }, { new: true });
};