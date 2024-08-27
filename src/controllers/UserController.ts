import { Request, Response } from 'express';
import { validate } from 'uuid';
import dataSource from '../config/dataSource'
import { User } from '../models/User';
import bcrypt from 'bcrypt';

export class UserController {
  static async register(req: Request, res: Response) {
    const { fullname, email, login, password, isActive } = req.body;

    if (!fullname || !email || !login || !password || isActive === undefined) {
      return res.status(400).json({ message: 'Fullname, email, login, password, and isActive are required' });
    }

    try {
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = new User();
      user.fullname = fullname; 
      user.email = email;
      user.login = login;
      user.password = hashedPassword;
      user.isActive = isActive;
      
      const userRepository = dataSource.getRepository(User);
      const savedUser = await userRepository.save(user);
      return res.status(201).json(savedUser);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  }

  static async getUsers(req: Request, res: Response) {
    const { fullname, email, page = 1, limit = 10 } = req.query;

    const userRepository = dataSource.getRepository(User);

    try {
      const queryBuilder = userRepository.createQueryBuilder('user');

      queryBuilder.where('user.isActive = :isActive', { isActive: true });

      if (fullname) {
        queryBuilder.andWhere('user.fullname LIKE :fullname', { fullname: `%${fullname}%` });
      }

      if (email) {
        queryBuilder.andWhere('user.email LIKE :email', { email: `%${email}%` });
      }

      queryBuilder.skip((Number(page) - 1) * Number(limit));
      queryBuilder.take(Number(limit));

      const [users, total] = await queryBuilder.getManyAndCount();

      if (users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }

      return res.status(200).json({
        total,
        page: Number(page),
        limit: Number(limit),
        users,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    if (!validate(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const userRepository = dataSource.getRepository(User);

    try {

      const user = await userRepository.findOne({
        where: { id, isActive: true },
        select: ['id', 'fullname', 'email', 'isActive'],
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async changePassword(req: Request, res: Response) {
    const { id } = req.params;
    const { existingPassword, newPassword } = req.body;

    if (!validate(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const userRepository = dataSource.getRepository(User);

    try {
      const user = await userRepository.findOne({
        where: { id },
        select: ['id', 'password'],
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(existingPassword, user.password);
      if (!isPasswordValid) {
        return res.status(403).json({ message: 'Existing password is incorrect' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      await userRepository.save(user);

      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    if (!validate(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const userRepository = dataSource.getRepository(User);

    try {
      const user = await userRepository.findOne({ where: { id } });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.isActive = false;
      await userRepository.save(user);

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}