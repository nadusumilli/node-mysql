import express from 'express';
import posts from '../controllers/posts';

const router = express.Router();

router.use('/', posts.fetchAllPosts);

export default router;
