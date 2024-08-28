import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

router.post('/user/register', userController.register.bind(userController));
router.get('/user', userController.getUsers.bind(userController));
router.get('/user/:id', userController.getUserById.bind(userController));
router.put('/user/:id/password/change', UserController.changePassword);
router.delete('/user/:id', UserController.deleteUser);

export default router;
