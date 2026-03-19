import z from "zod";

export const createRestaurantSchema = z.object({
    owner: z.string().optional(),
    restaurantName: z.string().min(1),
    address: z.string().min(1),
    description: z.string().min(1),
    googleMapsLink: z.string().url(),
    images: z.array(z.string().url()).optional(),
    avgRating: z.number().min(0).max(5).optional(),
    amtRatings: z.number().int().min(0).optional(),
    tags: z.array(z.string().min(1)).min(1).optional(),
    minPrice: z.string().transform(Number).refine(val => !isNaN(val), { message: "minPrice must be a number" }),
    maxPrice: z.string().transform(Number).refine(val => !isNaN(val), { message: "maxPrice must be a number" }),
    openingHour: z.string().min(1),
    closingHour: z.string().min(1),
    mobileNumber: z.string().min(1),
    websites: z.union([z.string(), z.array(z.string())])
        .optional()
        .transform(val => {
            const arr = typeof val === "string" ? [val] : val;
            const filtered = arr?.filter(s => s.trim() !== "");
            return filtered?.length ? filtered : undefined;
        }),               
});