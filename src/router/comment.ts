import express from 'express';
import { comment } from '../controllers';

const router = express.Router();

router.get('/', comment.fetchAllComments);
router.get('/:id', comment.fetchCommentById);
router.post('/', comment.createComment);
router.put('/:id', comment.updateCommentById);
router.delete('/:id', comment.deleteCommentById);

export default router;
