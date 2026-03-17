export interface Reply {
    _id: string;
    user: string | null;
    post: string;
    content: string;
    isAnonymous: boolean;
    likes: number;
    creationDate: string;
    canEdit?: boolean;

    isRestaurantOwner?: boolean;
    displayName?: string;
    displayAvatar?: string;
}