import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Artist } from './Artist';
import { Track } from './Track';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
      name: string;

    @Column()
      year: number;

    @Column({ nullable: true })
      artistId: string | null;

    @Column({ default: false })
      hidden: boolean;

    @ManyToOne(() => Artist, artist => artist.albums, { onDelete: 'SET NULL' })
      artist: Artist;

    @OneToMany(() => Track, track => track.album, { onDelete: 'SET NULL' })
      tracks: Track[];

    constructor(name: string, year: number, artistId: string | null = null) {
      this.name = name;
      this.year = year;
      this.artistId = artistId;
      this.hidden = false;
    }
}
