import express from 'express';
import { auth } from '../controllers';
import commentRouter from './comment';
import postRouter from './posts';
import storyRouter from './story';
import userRouter from './user';

const router = express.Router();

router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/stories', storyRouter);
router.use('/comments', commentRouter);

// Handle authentication routes.
router.post('/login', auth.loginUser);
router.delete('/logout', auth.logoutUser);
router.post('/register', auth.registerUser);

export default router;
