import { Request, Response } from 'express';
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
}