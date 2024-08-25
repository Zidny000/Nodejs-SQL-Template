import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  entityId: string; // can refer to either Album, Track or Artist
}