import { Request, Response, NextFunction } from 'express';
import { validate } from 'uuid';

export function validateUserId(req: Request, res: Response, next: NextFunction) {

  if (req.path === '/user/register') {
    return next();
  }

  const userId = req.headers['userid'];

  if (!userId) {
    return res.status(400).json({ message: 'userId header is required' });
  }

  if (!validate(userId as string)) {
    return res.status(400).json({ message: 'Invalid userId' });
  }

  next();
}