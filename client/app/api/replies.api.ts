import type { Reply } from "../types/reply";
import api from "./axios";

export interface CreateReplyPayload {
    post: string;
    content: string;
    isAnonymous: boolean;
}

export const createReply = async (replyData: CreateReplyPayload) => {
    const res = await api.post("/replies/createReply", {
        post: replyData.post,
        content: replyData.content,
        isAnonymous: replyData.isAnonymous
    });

    return res.data;
};

export const findPostReplies = async (postId: string): Promise<Reply[]> => {
    const res = await api.get(`/replies/getReplies/${postId}`);
    return res.data;
};

export const likeReply = async (id: string): Promise<Reply> => {
    const res = await api.post(`/replies/${id}/like`);
    return res.data;
};

export const unlikeReply = async (id: string): Promise<Reply> => {
    const res = await api.post(`/replies/${id}/unlike`);
    return res.data;
};