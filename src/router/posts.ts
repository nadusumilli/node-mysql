import express from 'express';
import posts from '../controllers/post';

const router = express.Router();

// fetch all posts
router.get('/', posts.fetchAllPosts);

// fetch post by id.
router.get('/:id', posts.fetchPostById);

// create a new post.
router.post('/create', posts.createPost);

// update a post.
router.put('/:id/update', posts.updatePost);

// delete a post.
router.delete('/:id/delete', posts.deletePost);

export default router;
