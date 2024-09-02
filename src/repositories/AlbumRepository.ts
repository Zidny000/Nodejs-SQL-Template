import { DataSource } from 'typeorm';
import { Album } from '../models/Album';

export const AlbumRepository = (dataSource: DataSource) =>
  dataSource.getRepository(Album).extend({
    async getByFilter(title?: string, year?: number, page: number = 1, limit: number = 10) {
      const queryBuilder = this.createQueryBuilder('album')
        .where('album.hidden = :isHidden', { isHidden: false });

      if (title) {
        queryBuilder.andWhere('album.name LIKE :title', { title: `%${title}%` });
      }

      if (year) {
        queryBuilder.andWhere('album.year = :year', { year });
      }

      const [albums, total] = await queryBuilder
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return { albums, total };
    },

    async getById(id: string) {
      return this.findOne({ where: { id } });
    },

    async getByArtistId(artistId: string, page: number = 1, limit: number = 10) {
      const queryBuilder = this.createQueryBuilder('album')
        .where('album.artistId = :artistId', { artistId })
        .andWhere('album.hidden = :isHidden', { isHidden: false })
        .skip((page - 1) * limit)
        .take(limit);

      const [albums, total] = await queryBuilder.getManyAndCount();
      return { albums, total };
    },

    async updateAlbum(id: string, updateData: Partial<Album>) {
      await this.update(id, updateData);
      return this.getById(id);
    },

    async markAsHidden(id: string) {
      const album = await this.findOne({ where: { id } });
      if (album) {
        album.hidden = true;
        this.save(album);
      }
    },
  });
