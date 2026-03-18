import type { Post } from "../types/post";
import api from "./axios";

export interface CreatePostPayload {
    restaurant: string 
    rating: number
    content: string
    isAnonymous: boolean
    ratePricing?: "P" | "PP" | "PPP"
    waitTime?: "No Wait" | "15-30m" | "1hr+"
    recommended?: boolean
    pictures?: File[]
    existingPictures?: string[]
}

export const createPost = async (postData: CreatePostPayload) => {
    const formData = new FormData()

    formData.append("restaurant", postData.restaurant)
    formData.append("rating", String(postData.rating))
    formData.append("content", postData.content)
    formData.append("isAnonymous", String(postData.isAnonymous))
    
    if (postData.ratePricing) formData.append("ratePricing", postData.ratePricing)
    if (postData.waitTime) formData.append("waitTime", postData.waitTime)
    if (postData.recommended !== undefined) {
        formData.append("recommended", String(postData.recommended))
    }

    postData.pictures?.forEach((file) => {
        formData.append("pictures", file)
    })

    const res = await api.post("/posts/createPost", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })

    return res.data
}

export const updatePost = async (
    id: string,
    postData: CreatePostPayload
): Promise<Post> => {
    const formData = new FormData();

    formData.append("restaurant", postData.restaurant);
    formData.append("rating", String(postData.rating));
    formData.append("content", postData.content);
    formData.append("isAnonymous", String(postData.isAnonymous));

    if (postData.ratePricing) formData.append("ratePricing", postData.ratePricing);
    if (postData.waitTime) formData.append("waitTime", postData.waitTime);
    if (postData.recommended !== undefined) {
        formData.append("recommended", String(postData.recommended));
    }
    if (postData.existingPictures) {
        formData.append("existingPictures", JSON.stringify(postData.existingPictures))
    }

    postData.pictures?.forEach((file) => {
        formData.append("pictures", file);
    });

    const res = await api.patch(`/posts/editPost/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
}

export const findRestaurantPosts = async (id: string): Promise<Post[]> => {
    const res = await api.get(`/posts/getPosts/${id}`)
    return res.data
}

export const deletePost = async (id: string) => {
    await api.patch(`/posts/deletePost/${id}`)
}

export const likePost = async (id: string): Promise<Post> => {
    const res = await api.post(`/posts/${id}/like`);
    return res.data;
};

export const unlikePost = async (id: string): Promise<Post> => {
    const res = await api.post(`/posts/${id}/unlike`);
    return res.data;
};

export const fetchPostsByUser = async (id: string): Promise<Post[]> => {
    const res = await api.get(`/posts/get-posts/user/${id}`)
    return res.data
}

