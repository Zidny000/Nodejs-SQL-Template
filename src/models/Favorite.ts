import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

export enum EntityType {
  ARTIST = 'artist',
  ALBUM = 'album',
  TRACK = 'track',
}

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  entityId: string;

  @Column({
    type: 'enum',
    enum: EntityType,
  })
  entityType: EntityType;

  @ManyToOne(() => User, user => user.favorites, { onDelete: 'CASCADE' })
  user: User;

  constructor(entityId: string, entityType: EntityType, user: User) {
    this.entityId = entityId;
    this.entityType = entityType;
    this.user = user;
  }
}