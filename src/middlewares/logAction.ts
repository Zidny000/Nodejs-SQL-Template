import { Request, Response, NextFunction } from 'express';
import { ActionType, EntityType } from '../models/AccessLog';
import { AccessLogService } from '../services/AccessLogService';

const accessLogService = new AccessLogService();

export const logAction = (action: ActionType, entity: EntityType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.body.userId || req.params.userId || (req.query.userId as string);
      
      // Only log if there's a userId present
      if (userId) {
        // We'll log the action asynchronously to not block the request
        accessLogService.logUserAction(userId, action, entity).catch(err => {
          console.error('Error logging user action:', err);
        });
      }
      
      next();
    } catch (error) {
      // If the logging fails, we still want to continue with the request
      console.error('Error in logAction middleware:', error);
      next();
    }
  };
};
