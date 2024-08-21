import { Request, Response } from 'express';
import {
    createNewPost,
    deletePostById,
    findAllPosts,
    findPost,
    updatePostById,
} from '../models/post';

export const fetchAllPosts = async (req: Request, res: Response) => {
    const [data, err] = await findAllPosts();
    if (err) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(200).json(data);
    }
};

export const fetchPostById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [data, err] = await findPost(id);
    if (err) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(200).json(data);
    }
};

export const createPost = async (req: Request, res: Response) => {
    const post = req.body;
    const [data, err] = await createNewPost(post);
    if (err) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(201).json(data);
    }
};

export const updatePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = req.body;
    const [data, err] = await updatePostById(+id, post);
    if (err) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(200).json(data);
    }
};

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    await deletePostById(id);
    res.status(204).end();
};

export default {
    fetchAllPosts,
    fetchPostById,
    createPost,
    updatePost,
    deletePost,
};
