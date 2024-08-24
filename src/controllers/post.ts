import { Request, Response } from 'express';
import {
    createNewPost,
    deletePostById,
    findAllPosts,
    findPost,
    updatePostById,
} from '../models/post';

// Fetch all posts from the database.
export const fetchAllPosts = async (req: Request, res: Response) => {
    const [data, err] = await findAllPosts();
    if (err) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(200).json(data);
    }
};

// Fetch a post by id from the database.
export const fetchPostById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [data, err] = await findPost(id);
    if (err) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(200).json(data);
    }
};

// Create a new post in the database.
export const createPost = async (req: Request, res: Response) => {
    const post = req.body;
    const [data, err] = await createNewPost(post);
    if (err) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(201).json(data);
    }
};

// Update a post in the database.
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

// Delete a post from the database.
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
