import express from 'express';
import { user } from '../controllers';

const router = express.Router();

router.get('/', user.fetchAllUsers);
router.get('/:id', user.fetchUserById);
router.post('/', user.createUser);
router.put('/:id', user.updateUserById);
router.delete('/:id', user.deleteUserById);

export default router;
