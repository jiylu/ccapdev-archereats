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