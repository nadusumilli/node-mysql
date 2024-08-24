import express from 'express';
import { story } from '../controllers';

const router = express.Router();

router.get('/', story.fetchAllStories);
router.get('/:id', story.fetchStoryById);
router.post('/', story.createStory);
router.put('/:id', story.updateStoryById);
router.delete('/:id', story.deleteStoryById);

export default router;
