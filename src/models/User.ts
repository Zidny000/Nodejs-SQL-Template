import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Artist } from './Artist';
import { AccessLog } from './AccessLog';

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

  @OneToMany(() => Artist, artist => artist.user)
  artists: Artist[];

  @OneToMany(() => AccessLog, accessLog => accessLog.user)
  accessLogs: AccessLog[];
}