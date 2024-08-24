import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../models';
import { createNewUser, findUserByUserName } from '../models/user';

const registerUser = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res
            .status(400)
            .json({ error: 'Username, password, and email are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            username,
            password: hashedPassword,
            email,
            ...req.body,
        };

        const [newUser, error] = await createNewUser(user);

        if (error) {
            console.log(error);
            return res
                .status(500)
                .json({ error: `Error creating user: \n${error.length}` });
        }

        delete newUser.password;

        return res.status(201).json({ newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const logoutUser = (req: Request, res: Response) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({ error: 'Username and password are required' });
    }

    try {
        const [user, error]: typeof db.User = await findUserByUserName(
            username
        );
        if (!user || error) {
            return res
                .status(404)
                .json({ error: error ? error : 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET ?? 'secretKey',
            {
                expiresIn: '1d',
            }
        );

        delete user.password;

        return res
            .cookie('accessToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            })
            .status(200)
            .json({ user });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export default {
    registerUser,
    logoutUser,
    loginUser,
};
