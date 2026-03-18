import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as postService from 'services/post.service.js';
import { decrementRestaurantRating, recalculateRestaurantRating } from 'services/restaurant.service.js';
import { AuthenticatedRequest } from 'types/express.js';
import { PostCreateInput } from "types/post.js"
import { logger } from 'utils/logger.js';
import { fetchUserByIdService } from 'services/user.service.js';

export const createPost = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const data = req.body;
        const files = req.files as Express.Multer.File[] | undefined;

        const postPayload: PostCreateInput = {
            user: req.user.id!,
            restaurant: data.restaurant,
            rating: Number(data.rating),
            content: data.content,
            isAnonymous: data.isAnonymous === "true",
            ratePricing: data.ratePricing as "P" | "PP" | "PPP" | undefined,
            waitTime: data.waitTime as "No Wait" | "15-30m" | "1hr+" | undefined,
            recommended: data.recommended !== undefined ? data.recommended === "true" : undefined,
            pictures: []
        };

        const post = await postService.createPost(postPayload, files);
        return res.status(201).json(post);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: (err as Error).message });
    }
};

export const getPosts = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const posts = await postService.getPosts(req.user?.id);
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message}); 
    }
};

export const getPostsByRestaurantId = async (req: AuthenticatedRequest, res: Response) => {
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

        const posts = await postService.getPostsByRestaurantIdService(id, req.user?.id)

        logger.info(`Returning ${posts.length} posts for restaurant ${id}`)
        res.status(200).json(posts)
    } catch (err: unknown) {
        logger.error("Error getting posts by ID", { error: err instanceof Error ? err.message : err, id: req.params.id });
        res.status(500).json({ message: err instanceof Error ? err.message : err})
    }
}

export const likePost = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const post = await postService.likePost(req.params.id, req.user.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: (err as Error).message });
    }
};

export const unlikePost = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const post = await postService.unlikePost(req.params.id, req.user.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: (err as Error).message });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    logger.info("DELETEPOST CONTROLLER called")
    try {
        const { id } = req.params

        if (!id || Array.isArray(id)) {
            logger.info(`post id Parameter typeof: ${typeof(id)} `)
            logger.error("Invalid paramters for deletePost.")
            return res.status(400).json({ error: "Invalid parameters." })
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            logger.warn("Invalid post ID provided", { id: req.params.id });
            return res.status(404).json({ message: "Invalid postId" })
        }

        const deletedPost = await postService.deletePost(id)

        if (deletedPost === null) {
            return res.status(404).json({ message: "Cannot delete post. deletedPost value is null" })
        }

        await decrementRestaurantRating(deletedPost.restaurant.toString(), deletedPost.rating);
        
        logger.info(`Deleted post ${id}`);


        return res.status(200).json(deletedPost);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message})
    }
}

export const editPostController = async (req: AuthenticatedRequest, res: Response) => {
    logger.info("EDITPOST CONTROLLER CALLED");

    try {
        const { id } = req.params;

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!id || Array.isArray(id)) {
            logger.info(`post id Parameter typeof: ${typeof id}`);
            logger.error("Invalid parameters for editPost.");
            return res.status(400).json({ error: "Invalid parameters." });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            logger.error("Invalid post ID provided", { id: req.params.id });
            return res.status(404).json({ message: "Invalid postId" });
        }

        const oldPost = await postService.getPostById(id);

        if (!oldPost) {
            logger.error("editPost, oldPost is null");
            return res.status(404).json({ message: "Post not found" });
        }

        if (oldPost.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const oldRating = oldPost.rating;
        const files = req.files as Express.Multer.File[] | undefined;
        const existingPictures = req.body.existingPictures
            ? JSON.parse(req.body.existingPictures)
            : oldPost.pictures;

        const postPayload: PostCreateInput = {
            user: oldPost.user.toString(),
            restaurant: req.body.restaurant || oldPost.restaurant.toString(),
            rating: req.body.rating !== undefined ? Number(req.body.rating) : oldPost.rating,
            content: req.body.content ?? oldPost.content,
            isAnonymous: req.body.isAnonymous !== undefined
                ? req.body.isAnonymous === "true"
                : oldPost.isAnonymous,
            ratePricing: req.body.ratePricing ?? oldPost.ratePricing,
            waitTime: req.body.waitTime ?? oldPost.waitTime,
            recommended: req.body.recommended !== undefined
                ? req.body.recommended === "true"
                : oldPost.recommended,
            pictures: existingPictures
        };

        const updatedPost = await postService.editPost(id, postPayload, files);

        if (!updatedPost) {
            logger.error("Cannot edit post", { id: req.params.id });
            return res.status(404).json({ message: "Cannot edit post" });
        }

        await recalculateRestaurantRating(
            postPayload.restaurant,
            updatedPost.rating,
            oldRating
        );

        return res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
};

export const fetchPostsByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params

        if (!userId || Array.isArray(userId)) {
            logger.info(`userid Parameter typeof: ${typeof(userId)} `)
            logger.error("Invalid paramters for fetchPostsByUser.")
            return res.status(400).json({ error: "Invalid parameters." })
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            logger.error("Invalid user ID provided", { id: req.params.id });
            return res.status(404).json({ message: "Invalid postId" })
        }

        if (!await fetchUserByIdService(userId)) {
            logger.error(`${userId} not found`)
            return res.status(404).json({ message: "Invalid userId, userId not found" })
        }

        const posts = await postService.fetchPostsByUserService(userId)

        return res.status(200).json(posts)

    } catch (err) { 
        logger.error(`fetchPostsByUser error ${err}`)
        res.status(400).json({ message: (err as Error).message})
    }
}