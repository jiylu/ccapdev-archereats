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

export const updateReply = async (
    replyId: string,
    data: { content: string; isAnonymous: boolean }
) => {
    const res = await api.put(`/replies/${replyId}`, data);
    return res.data;
};

export const deleteReply = async (replyId: string) => {
    const res = await api.delete(`/replies/${replyId}`);
    return res.data;
}

export const getRepliesByPostId = async (postId: string) => {
    const res = await api.get<Reply[]>(`/replies/getReplies/${postId}`);
    return res.data;
};