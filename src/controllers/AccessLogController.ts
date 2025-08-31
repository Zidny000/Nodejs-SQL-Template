import { Request, Response } from 'express';
import { validate } from 'uuid';
import { AccessLogService } from '../services/AccessLogService';
import { errorLogger } from '../utils/logger';

export class AccessLogController {
  private accessLogService: AccessLogService;

  constructor() {
    this.accessLogService = new AccessLogService();
  }

  async getLogsByUser(req: Request, res: Response) {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!validate(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
      const { logs, total, page: currentPage, limit: pageLimit } = await this.accessLogService.getLogsByUser(
        userId, 
        Number(page), 
        Number(limit)
      );

      if (logs.length === 0) {
        return res.status(404).json({ message: 'No access logs found for this user' });
      }

      return res.status(200).json({
        total,
        page: currentPage,
        limit: pageLimit,
        logs,
      });
    } catch (error) {
      errorLogger.error('Error getting access logs by user:', { error, userId });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
