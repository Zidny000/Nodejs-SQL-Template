import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Artist } from './Artist';
import { Album } from './Album';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
      name: string;

    @Column({ default: false })
      hidden: boolean;

    @Column({ nullable: true })
      artistId: string | null;

    @ManyToOne(() => Artist, artist => artist.tracks, { onDelete: 'SET NULL' })
      artist: Artist;

    @Column({ nullable: true })
      albumId: string | null;

    @ManyToOne(() => Album, album => album.tracks, { onDelete: 'SET NULL' })
      album: Album;

    @Column()
      duration: number;

      constructor(name: string, artistId: string | null = null, albumId: string | null = null) {
        this.name = name;
        this.artistId = artistId;
        this.albumId = albumId;
        this.hidden = false;
      }
}
