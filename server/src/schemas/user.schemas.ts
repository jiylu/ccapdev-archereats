import z from "zod";

export const createUserSchema = z.object({
    email: z.email(),
    username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]{3,20}$/),
    password: z.string().min(8),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    isStudent: z.boolean()
});