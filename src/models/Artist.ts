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

  @Column({ default: false })
  hidden: boolean;

  @ManyToOne(() => User, user => user.artists, { onDelete: 'SET NULL' })
  user: User;

  @OneToMany(() => Track, track => track.artist)
  tracks: Track[];

  @OneToMany(() => Album, album => album.artist, { onDelete: 'SET NULL' })
  albums: Album[];

  constructor(name: string, userId: string | null = null) {
    this.name = name;
    this.userId = userId;
    this.hidden = false;
  }
}
