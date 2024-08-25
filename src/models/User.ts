import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Artist } from './Artist';
import { AccessLog } from './AccessLog';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;  // Non-null assertion operator

  @Column()
  login: string;

  @Column()
  password: string;

  @OneToMany(() => Artist, artist => artist.user)
  artists: Artist[];

  @OneToMany(() => AccessLog, accessLog => accessLog.user)
  accessLogs: AccessLog[];
}