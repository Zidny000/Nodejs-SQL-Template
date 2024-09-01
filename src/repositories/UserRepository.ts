import { DataSource } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { Artist } from '../models/Artist';

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
    },

    async changePassword(id: string, existingPassword: string, newPassword: string): Promise<void> {
      const user = await this.findOne({ where: { id }, select: ['id', 'password'] });

      if (!user) {
        throw 'User not found';
      }

      const isPasswordValid = await bcrypt.compare(existingPassword, user.password);
      console.log(isPasswordValid);
      if (!isPasswordValid) {
        throw 'Existing password is incorrect';
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      await this.save(user);
    },

    async deleteUser(id: string): Promise<void> {
      const user = await this.findOne({ where: { id } });

      if (!user) {
        throw 'User not found';
      }

      user.isActive = false;
      await this.save(user);

      const artistRepository = dataSource.getRepository(Artist)
      const artists = user.artists || [];
      for (const artist of artists) {
        artist.hidden = true;
        await artistRepository.save(artist);
      }
    },

  });

