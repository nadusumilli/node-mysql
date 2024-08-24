import { Request, Response } from 'express';
import {
    createNewComment,
    deleteComment,
    findAllComments,
    findCommentById,
    updateComment,
} from '../models/comment';

const fetchAllComments = async (req: Request, res: Response) => {
    const [comments, error] = await findAllComments();
    if (error) {
        return res.status(500).json({ error });
    }
    return res.status(200).json({ comments });
};

const fetchCommentById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const [comment, error] = await findCommentById(id);
    if (error) {
        return res.status(500).json({ error });
    }
    return res.status(200).json({ comment });
};

const createComment = async (req: Request, res: Response) => {
    const comment = req.body;
    const [newComment, error] = await createNewComment(comment);
    if (error) {
        return res.status(500).json({ error });
    }
    return res.status(201).json({ newComment });
};

const updateCommentById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const comment = req.body;
    const [updatedComment, error] = await updateComment(id, comment);
    if (error) {
        return res.status(500).json({ error });
    }
    return res.status(200).json({ updatedComment });
};

const deleteCommentById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const [comment, error] = await deleteComment(id);
    if (error) {
        return res.status(500).json({ error });
    }
    return res.status(200).json({ comment });
};

export default {
    createComment,
    deleteCommentById,
    fetchAllComments,
    fetchCommentById,
    updateCommentById,
};
