import { Request, Response } from 'express';
import * as postService from 'services/post.service.js';
import { AuthenticatedRequest } from 'types/express.js';
import { PostCreateInput } from "types/post.js"

export const createPost = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const data = req.body;
        const pictures = (req.files as Express.Multer.File[] | undefined)?.map(f => f.path) || [];

        const postPayload: PostCreateInput = {
            user: req.user.id!,
            restaurant: data.restaurant,
            rating: Number(data.rating),
            content: data.content,
            isAnonymous: data.isAnonymous === "true",
            ratePricing: data.ratePricing as "P" | "PP" | "PPP" | undefined,
            waitTime: data.waitTime as "No Wait" | "15-30m" | "1hr+" | undefined,
            recommended: data.recommended !== undefined ? data.recommended === "true" : undefined,
            pictures
        };

        const post = await postService.createPost(postPayload);
        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: (err as Error).message });
    }
};

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await postService.getPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message}); 
    }
};

export const likePost = async (req: Request<{id: string}>, res: Response) => {
    try {
        const post = await postService.likePost(req.params.id);
        res.json(post);
    } catch (err) {
        res.status(404).json({ message: (err as Error).message});
    }
}

export const replyToPost = async (req: Request<{ id: string }>, res:Response) => {
    try {
        const reply = await postService.replyToPost(req.params.id, req.body);
        res.status(201).json(reply);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message});
    }
}