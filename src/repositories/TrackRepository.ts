import { DataSource } from 'typeorm';
import { Track } from '../models/Track';

export const TrackRepository = (dataSource: DataSource) =>
  dataSource.getRepository(Track).extend({
    async getByFilter(title?: string, page: number = 1, limit: number = 10) {
      const queryBuilder = this.createQueryBuilder('track')
        .where('track.hidden = :isHidden', { isHidden: false });

      if (title) {
        queryBuilder.andWhere('track.name LIKE :title', { title: `%${title}%` });
      }

      const [tracks, total] = await queryBuilder
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return { tracks, total };
    },

    async getByAlbumId(albumId: string, page: number = 1, limit: number = 10) {
      const queryBuilder = this.createQueryBuilder('track');

      const [tracks, total] = await queryBuilder
        .where('track.albumId = :albumId', { albumId })
        
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return { tracks, total };
    },

    async getByArtistId(artistId: string, page: number = 1, limit: number = 10) {
      const queryBuilder = this.createQueryBuilder('track')

      const [tracks, total] = await queryBuilder
      .where('track.artistId = :artistId', { artistId })
      .andWhere('album.hidden = :isHidden', { isHidden: false })
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

      return { tracks, total };
    },

    async getById(trackId: string) {
      return this.findOne({ where: { id: trackId } });
    },

    async createTrack(trackData: Partial<Track>) {
      const track = this.create(trackData);
      return this.save(track);
    },

    async updateTrack(id: string, updateData: Partial<Track>) {
      await this.update(id, updateData);
      return this.getById(id);
    },

    async markAsHidden(id: string) {
      const track = await this.findOne({ where: { id } });
      if (track) {
        track.hidden = true;
        return this.save(track);
      }
      return null;
    },

  });
