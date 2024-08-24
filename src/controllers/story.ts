import { Request, Response } from 'express';
import {
    createNewStory,
    deleteStory,
    findAllStories,
    findStoryById,
    updateStory,
} from '../models/story';

const fetchAllStories = async (req: Request, res: Response) => {
    const [stories, error] = await findAllStories();

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ stories });
};

const fetchStoryById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const [story, error] = await findStoryById(id);

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ story });
};

const createStory = async (req: Request, res: Response) => {
    const story = req.body;
    const [newStory, error] = await createNewStory(story);

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(201).json({ newStory });
};

const updateStoryById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const story = req.body;
    const [updatedStory, error] = await updateStory(id, story);

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ updatedStory });
};

const deleteStoryById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const [story, error] = await deleteStory(id);

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ story });
};

export default {
    createStory,
    deleteStoryById,
    fetchAllStories,
    fetchStoryById,
    updateStoryById,
};
