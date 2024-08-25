import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

export enum ActionType {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum EntityType {
  ALBUM = 'ALBUM',
  TRACK = 'TRACK',
  ARTIST = 'ARTIST',
}

@Entity()
export class AccessLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.accessLogs)
  user: User;

  @Column()
  accessDate: Date;

  @Column({
    type: 'enum',
    enum: ActionType,
  })
  action: ActionType;

  @Column({
    type: 'enum',
    enum: EntityType,
  })
  entity: EntityType;
}