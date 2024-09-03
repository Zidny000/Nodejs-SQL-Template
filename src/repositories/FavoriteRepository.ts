import { DataSource } from 'typeorm';
import { Favorite, EntityType } from '../models/Favorite';

export const FavoriteRepository = (dataSource: DataSource) =>
  dataSource.getRepository(Favorite).extend({
    async findByUserIdAndEntity(userId: string, entityId: string, entityType: EntityType) {
      return this.findOne({
        where: { user: { id: userId }, entityId, entityType },
      });
    },

    async findAllByUser(userId: string) {
      return this.find({
        where: { user: { id: userId } },
      });
    },
  });