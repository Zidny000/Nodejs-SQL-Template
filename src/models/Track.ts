import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Artist } from './Artist';
import { Album } from './Album';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, artist => artist.tracks)
  artist: Artist;

  @Column({ nullable: true })
  albumId: string | null;

  @ManyToOne(() => Album, album => album.tracks)
  album: Album;

  @Column()
  duration: number; // in seconds
}