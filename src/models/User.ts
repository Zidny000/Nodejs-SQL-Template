import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Artist } from './Artist';
import { AccessLog } from './AccessLog';
import { Favorite } from './Favorite';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @OneToMany(() => Artist, artist => artist.user, { onDelete: 'SET NULL' })
  artists: Artist[];

  @OneToMany(() => AccessLog, accessLog => accessLog.user)
  accessLogs: AccessLog[];

  @OneToMany(() => Favorite, favorite => favorite.user, { onDelete: 'CASCADE' })
  favorites: Favorite[];

  constructor(fullname: string, email: string, login: string, password: string, isActive: boolean = true) {
    this.fullname = fullname;
    this.email = email;
    this.login = login;
    this.password = password;
    this.isActive = isActive;
  }
}