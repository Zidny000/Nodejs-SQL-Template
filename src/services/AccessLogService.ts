import dataSource from '../config/dataSource';
import { ActionType, EntityType } from '../models/AccessLog';
import { AccessLogRepository } from '../repositories/AccessLogRepository';

export class AccessLogService {
  private accessLogRepository = AccessLogRepository(dataSource);

  async logUserAction(userId: string, action: ActionType, entity: EntityType): Promise<void> {
    await this.accessLogRepository.createLog(userId, action, entity);
  }

  async getLogsByUser(userId: string, page: number = 1, limit: number = 10) {
    return this.accessLogRepository.getLogsByUser(userId, page, limit);
  }
}
