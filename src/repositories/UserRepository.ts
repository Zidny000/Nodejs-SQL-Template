import { DataSource } from 'typeorm';
import { User } from '../models/User';

export const UserRepository = (dataSource: DataSource) =>
dataSource.getRepository(User).extend({
  async getByFilter(fullname?: string, email?: string, page: number = 1, limit: number = 10) {
    const queryBuilder = this.createQueryBuilder('user')
      .where('user.isActive = :isActive', { isActive: true });

    if (fullname) {
      queryBuilder.andWhere('user.fullname LIKE :fullname', { fullname: `%${fullname}%` });
    }

    if (email) {
      queryBuilder.andWhere('user.email LIKE :email', { email: `%${email}%` });
    }

    const [users, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { users, total, page, limit };
  },

  async getById(id: string) {
    return this.findOne({
      where: { id, isActive: true },
      select: ['id', 'fullname', 'email', 'isActive'],
    });
  }
});

