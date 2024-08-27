import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

router.post('/user/register', UserController.register);
router.get('/user', UserController.getUsers);
router.get('/user/:id', UserController.getUserById);
router.put('/user/:id/password/change', UserController.changePassword);
router.delete('/user/:id', UserController.deleteUser);

export default router;