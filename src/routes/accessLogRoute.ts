import { Router } from 'express';
import { AccessLogController } from '../controllers/AccessLogController';

const router = Router();
const accessLogController = new AccessLogController();

router.get('/access-log/by-user/:userId', accessLogController.getLogsByUser.bind(accessLogController));

export default router;
