export interface PostCreateInput {
    user: string;
    restaurant: string;
    rating: number;
    content: string;
    isAnonymous?: boolean;
    ratePricing?: "P" | "PP" | "PPP";
    waitTime?: "No Wait" | "15-30m" | "1hr+";
    recommended?: boolean;
    pictures?: string[];
}