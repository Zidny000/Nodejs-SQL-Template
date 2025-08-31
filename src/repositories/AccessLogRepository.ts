import { DataSource } from 'typeorm';
import { AccessLog } from '../models/AccessLog';

export const AccessLogRepository = (dataSource: DataSource) =>
  dataSource.getRepository(AccessLog).extend({
    async createLog(userId: string, action: string, entity: string): Promise<AccessLog> {
      const log = new AccessLog();
      log.userId = userId;
      log.accessDate = new Date();
      log.action = action as any;
      log.entity = entity as any;
      
      return this.save(log);
    },
    
    async getLogsByUser(userId: string, page: number = 1, limit: number = 10) {
      const [logs, total] = await this.createQueryBuilder('log')
        .where('log.userId = :userId', { userId })
        .orderBy('log.accessDate', 'DESC')
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();
        
      return { logs, total, page, limit };
    }
  });
