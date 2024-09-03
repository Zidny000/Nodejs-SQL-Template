import { DataSource } from 'typeorm';
import { Artist } from '../models/Artist';

export const ArtistRepository = (dataSource: DataSource) =>
  dataSource.getRepository(Artist).extend({
    async getByFilter(title?: string, page: number = 1, limit: number = 10) {
      const queryBuilder = this.createQueryBuilder('artist')
        .where('artist.hidden = :isHidden', { isHidden: false });

      if (title) {
        queryBuilder.andWhere('artist.name LIKE :title', { title: `%${title}%` });
      }

      const [artists, total] = await queryBuilder
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return { artists, total };
    },

    async getById(id: string) {
      return this.findOne({
        where: { id },
        relations: ['user', 'tracks', 'albums'],
      });
    },

    async updateArtist(id: string, updateData: Partial<Artist>) {
      await this.update(id, updateData);
      return this.getById(id);
    },

    async markAsHidden(id: string) {
      const artist = await this.findOne({ where: { id } });
      if (artist) {
        artist.hidden = true;
        this.save(artist);
      }
    },
  });
