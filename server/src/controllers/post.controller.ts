import { Request, Response } from 'express';
import * as postService from 'services/post.service.js';

export const createPost = async (req: Request, res: Response) => {
    try {
        const post = await postService.createPost(req.body);
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message});
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