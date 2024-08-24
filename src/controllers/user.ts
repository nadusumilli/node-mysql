import { Request, Response } from 'express';
import {
    createNewUser,
    deleteUser,
    findAllUsers,
    findUserById,
    updateUser,
} from '../models/user';

const fetchAllUsers = async (req: Request, res: Response) => {
    const [users, error] = await findAllUsers();

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ users });
};

const fetchUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const [user, error] = await findUserById(id);

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ user });
};

const createUser = async (req: Request, res: Response) => {
    const user = req.body;
    const [newUser, error] = await createNewUser(user);

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(201).json({ newUser });
};

const updateUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = req.body;
    const [updatedUser, error] = await updateUser(id, user);

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ updatedUser });
};

const deleteUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const [user, error] = await deleteUser(id);

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ user });
};

export default {
    createUser,
    deleteUserById,
    fetchAllUsers,
    fetchUserById,
    updateUserById,
};
