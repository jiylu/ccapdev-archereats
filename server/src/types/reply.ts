export interface ReplyInput {
    _id: string
    user: string | null
    post: string
    content: string
    isAnonymous: boolean
    likes: number
    creationDate: Date
}