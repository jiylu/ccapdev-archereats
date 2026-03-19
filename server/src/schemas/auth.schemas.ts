import z from "zod";

export const authSchema = z.object({
    login: z.string().min(1),
    password: z.string().min(1)
})

export const resetSchema = z.object({
    login: z.string().min(1),
    password: z.string().min(8)
})