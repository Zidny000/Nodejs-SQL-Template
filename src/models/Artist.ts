import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Track } from './Track';
import { Album } from './Album';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  userId: string | null;

  @ManyToOne(() => User, user => user.artists)
  user: User;

  @OneToMany(() => Track, track => track.artist)
  tracks: Track[];

  @OneToMany(() => Album, album => album.artist)
  albums: Album[];
}