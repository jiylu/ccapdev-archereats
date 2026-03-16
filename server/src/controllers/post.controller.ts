import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as postService from 'services/post.service.js';
import { AuthenticatedRequest } from 'types/express.js';
import { PostCreateInput } from "types/post.js"
import { logger } from 'utils/logger.js';

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

export const getPostsByRestaurantId = async (req: Request, res: Response) => {
    logger.info(`GET getPostsByRestaurantId called`, { id: req.params.id})

    try {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            logger.info(`restaurant id Parameter typeof: ${typeof(id)} `)
            logger.error("Invalid paramters for getPostsByRestaurantId.")
            return res.status(400).json({ error: "Invalid parameters." })
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            logger.warn("Invalid restaurant ID provided", { id: req.params.id });
            return res.status(404).json({ message: "Invalid userId" })
        }

        const posts = await postService.getPostsByRestaurantIdService(id)

        logger.info(`Returning ${posts.length} posts for restaurant ${id}`)
        res.status(200).json(posts)
    } catch (err: unknown) {
        logger.error("Error getting posts by ID", { error: err instanceof Error ? err.message : err, id: req.params.id });
        res.status(500).json({ message: err instanceof Error ? err.message : err})
    }
}

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