import { Request, Response } from "express";
import mongoose from "mongoose";
import * as replyService from "services/replies.service.js";
import { AuthenticatedRequest } from "types/express.js";
import { logger } from "utils/logger.js";

export const createReply = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const data = req.body;

        const replyPayload = {
            user: req.user.id!,
            post: data.post,
            content: data.content,
            isAnonymous: data.isAnonymous === "true" || data.isAnonymous === true,
        };

        const reply = await replyService.createReply(replyPayload);
        res.status(201).json(reply);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: (err as Error).message });
    }
};

export const getRepliesByPostId = async (req: Request<{ id: string }>, res: Response) => {
    logger.info(`GET getRepliesByPostId called`, { id: req.params.id });

    try {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            logger.info(`post id Parameter typeof: ${typeof id}`);
            logger.error("Invalid parameters for getRepliesByPostId.");
            return res.status(400).json({ error: "Invalid parameters." });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            logger.warn("Invalid post ID provided", { id: req.params.id });
            return res.status(404).json({ message: "Invalid postId" });
        }

        const replies = await replyService.getRepliesByPostIdService(id);

        logger.info(`Returning ${replies.length} replies for post ${id}`);
        res.status(200).json(replies);
    } catch (err: unknown) {
        logger.error("Error getting replies by post ID", {
            error: err instanceof Error ? err.message : err,
            id: req.params.id
        });
        res.status(500).json({ message: err instanceof Error ? err.message : err });
    }
};

export const likeReply = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const reply = await replyService.likeReply(req.params.id, req.user.id);
        return res.status(200).json({
            ...reply.toObject(),
            likedBy: reply.likedBy.map((id) => id.toString())
        });
    } catch (err) {
        return res.status(404).json({ message: (err as Error).message });
    }
};

export const unlikeReply = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const reply = await replyService.unlikeReply(req.params.id, req.user.id);
        return res.status(200).json({
            ...reply.toObject(),
            likedBy: reply.likedBy.map((id) => id.toString())
        });
    } catch (err) {
        return res.status(404).json({ message: (err as Error).message });
    }
};

export const deleteReply = async (req: Request<{ id: string }>, res: Response) => {
    logger.info("DELETEREPLY CONTROLLER called");

    try {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            logger.info(`reply id Parameter typeof: ${typeof id}`);
            logger.error("Invalid parameters for deleteReply.");
            return res.status(400).json({ error: "Invalid parameters." });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            logger.warn("Invalid reply ID provided", { id: req.params.id });
            return res.status(404).json({ message: "Invalid replyId" });
        }

        const deletedReply = await replyService.deleteReply(id);

        if (!deletedReply) {
            return res.status(404).json({ message: "Cannot delete reply. deletedReply value is null" });
        }

        logger.info(`Deleted reply ${id}`);
        return res.status(200).json(deletedReply);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
};

